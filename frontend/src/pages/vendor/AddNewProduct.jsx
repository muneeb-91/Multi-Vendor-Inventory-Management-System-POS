import React, { useState } from 'react';
import { ArrowLeft, Info, Package, Bell, HelpCircle, Search } from 'lucide-react';
const AddNewProduct = () => {
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    supplier: '',
    stockQuantity: '',
    sellingPrice: '',
    purchaseDate: ''
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="min-h-screen bg-tertiary font-sans text-primary">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto">
        <button className="flex items-center text-sm text-gray-500 hover:text-primary font-medium mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Inventory
        </button>
        <h1 className="text-3xl font-bold mb-2 text-primary tracking-tight">Add New Product</h1>
        <p className="text-gray-500 mb-8 text-sm">Enter the details for the new inventory item.</p>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          
          {/* Basic Information Section */}
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-6">
              <Info className="w-5 h-5 text-secondary" />
              <h2 className="text-xl font-bold text-primary">Basic Information</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="productName"
                  placeholder="e.g. Industrial Steel Widget"
                  value={formData.productName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary appearance-none text-gray-600 transition-all"
                  >
                    <option value="">Select category</option>
                    <option value="electronics">Electronics</option>
                    <option value="hardware">Hardware</option>
                    <option value="software">Software</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Supplier
                  </label>
                  <select
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary appearance-none text-gray-600 transition-all"
                  >
                    <option value="">Select supplier</option>
                    <option value="techcorp">TechCorp Manufacturing Inc.</option>
                    <option value="global">Global Supply Co.</option>
                  </select>
                </div>
              </div>
            </div>
          </section>
          <hr className="border-gray-100 my-8" />
          {/* Inventory & Pricing Section */}
          <section className="mb-10">
             <div className="flex items-center gap-2 mb-6">
              <Package className="w-5 h-5 text-secondary" />
              <h2 className="text-xl font-bold text-primary">Inventory & Pricing</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="stockQuantity"
                  placeholder="0"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Selling Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    name="sellingPrice"
                    placeholder="0.00"
                    step="0.01"
                    value={formData.sellingPrice}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Purchase Date
                </label>
                <input
                  type="date"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary text-gray-600 transition-all"
                />
              </div>
            </div>
          </section>
          <hr className="border-gray-100 my-8" />
          {/* Actions */}
          <div className="flex justify-end gap-4">
            <button className="px-6 py-2.5 bg-white border border-gray-200 text-primary font-medium rounded-lg hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button className="px-6 py-2.5 bg-secondary text-white font-medium rounded-lg hover:bg-secondary/90 transition-colors flex items-center gap-2 shadow-sm">
              <Package className="w-4 h-4" />
              Save Product
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
export default AddNewProduct;