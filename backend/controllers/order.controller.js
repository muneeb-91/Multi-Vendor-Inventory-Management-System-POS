import mongoose from "mongoose";

import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

import { generateOrderNumber } from "../utils/generateOrderNumber.js";

export const createOrder = async (req, res) => {
  const {
    customerName,
    items,
    discount = 0,
    tax = 0,
    paymentMethod,
  } = req.body;

  // Validate Duplicate Products
  const uniqueProductIds = new Set(items.map((item) => item.productId));
  if (uniqueProductIds.size !== items.length) {
    throw "Duplicate products are not allowed in the same order.";
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Generate Order Number
    const orderNumber = await generateOrderNumber(session);
    // Fetch Products
    const productIds = items.map((item) => item.productId);

    const products = await Product.find({
      _id: { $in: productIds },
      vendorId: req.user.vendorId,
      status: "active",
    }).session(session);

    if (products.length !== items.length) {
      throw "One or more products not found.";
    }

    // Convert Products Array to Map (O(1))
    const productMap = new Map();
    products.forEach((product) => {
      productMap.set(product._id.toString(), product);
    });

    // Prepare Order Items
    let subtotal = 0;
    const orderItems = [];
    const bulkUpdates = [];

    for (const item of items) {
      const product = productMap.get(item.productId);
      if (!product) {
        throw "Product not found.";
      }
      if (product.stock < item.quantity) {
        throw `${product.name} has only ${product.stock} items left in stock.`;
      }
      const total = product.sellingPrice * item.quantity;
      subtotal += total;

      // Save Product Snapshot
      orderItems.push({
        productId: product._id,
        sku: product.sku,
        productName: product.name,
        quantity: item.quantity,
        unitPrice: product.sellingPrice,
        total,
      });

      // Deduct Stock
      bulkUpdates.push({
        updateOne: {
          filter: {
            _id: product._id,
            vendorId: req.user.vendorId,
          },
          update: {
            $inc: {
              stock: -item.quantity,
            },
          },
        },
      });
    }

    // Calculate Grand Total
    const grandTotal = subtotal - discount + tax;
    if (grandTotal < 0) {
      throw "Invalid grand total.";
    }

    // Create Order
    const order = await Order.create(
      [
        {
          vendorId: req.user.vendorId,
          generatedBy: {
            id: req.user._id,
            role: req.user.role,
            name: req.user.name,
          },
          orderNumber,
          customerName,
          items: orderItems,
          subtotal,
          discount,
          tax,
          grandTotal,
          paymentMethod,
        },
      ],
      { session },
    );

    // Update Product Stock
    const stockUpdateResult = await Product.bulkWrite(bulkUpdates, { session });

    if (stockUpdateResult.modifiedCount !== bulkUpdates.length) {
      throw "Failed to update product stock.";
    }

    // Commit Transaction
    await session.commitTransaction();

    res.status(201).json({
      success: true,
      message: "Order created successfully.",
      order: order[0],
    });
  } catch (error) {
    await session.abortTransaction();

    throw error;
  } finally {
    session.endSession();
  }
};

export const cancelOrder = async (req, res) => {
  const { id } = req.params;

  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    // Find Order
    const order = await Order.findOne({
      _id: id,
      vendorId: req.user.vendorId,
    }).session(session);

    if (!order) {
      throw "Order not found.";
    }

    // Prevent Duplicate Cancellation
    if (order.orderStatus === "cancelled") {
      throw "Order has already been cancelled.";
    }

    // Prepare Stock Restore Operations
    const bulkUpdates = order.items.map((item) => ({
      updateOne: {
        filter: {
          _id: item.productId,
          vendorId: req.user.vendorId,
        },
        update: {
          $inc: {
            stock: item.quantity,
          },
        },
      },
    }));

    // Restore Product Stock
    const stockUpdateResult = await Product.bulkWrite(bulkUpdates, { session });
    if (stockUpdateResult.modifiedCount !== bulkUpdates.length) {
      throw "Failed to restore product stock.";
    }

    // Update Order and payment Status
    order.orderStatus = "cancelled";

    if (order.paymentStatus === "paid") {
      order.paymentStatus = "refunded";
    }

    order.cancelledAt = new Date();
    order.cancelledBy = {
      id: req.user._id,
      role: req.user.role,
      name: req.user.name,
    };

    await order.save({ session });

    // Commit Transaction
    await session.commitTransaction();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully.",
      order,
    });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const getOrders = async (req, res) => {
  const orders = await Order.find({
    vendorId: req.user.vendorId,
  }).sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    orders,
  });
};
