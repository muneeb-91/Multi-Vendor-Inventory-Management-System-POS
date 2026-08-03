import React, { useState } from 'react';
import { ShoppingCart, Filter, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { orders } from '../../data';
import Pagination from '../../components/shared/Pagination';

const OrdersHistory = () => {
  return (
    <div className="min-h-screen bg-tertiary font-sans text-primary">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-primary tracking-tight">Orders History</h1>
            <p className="text-gray-500 text-sm">Manage and track all vendor transactions.</p>
          </div>
        </div>
        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-2xl">
              <thead>
                <tr className="bg-white border-b border-gray-200">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Order Number</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Customer Name</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Total Amount</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Created By</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono font-medium text-primary">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-primary">{order.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.createdBy}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <Pagination />
        </div>
      </main>
    </div>
  );
};
export default OrdersHistory;