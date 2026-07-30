import React, { useState } from 'react';
import { ShoppingCart, Filter, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { orders } from '../../data';
import Pagination from '../../components/pagination';

const OrdersHistory = () => {
  const [activeTab, setActiveTab] = useState('All Orders');
  const tabs = ['All Orders', 'Completed', 'Pending'];

  return (
    <div className="min-h-screen bg-tertiary font-sans text-primary">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-primary tracking-tight">Orders History</h1>
            <p className="text-gray-500 text-sm">Manage and track all vendor transactions.</p>
          </div>
          <Link to={'/vendor/create-order'} className="px-6 py-2.5 bg-secondary text-white font-medium rounded-lg hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap w-full md:w-auto">
            <ShoppingCart className="w-4 h-4" />
            Create New Order
          </Link>
        </div>
        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          
          {/* Tabs and Actions */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white overflow-x-auto">
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-tertiary text-primary border border-gray-200'
                      : 'text-gray-500 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-2 text-sm font-medium text-gray-600 px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
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
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
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
                    <td className="px-6 py-4 text-sm text-right">
                       <button className="p-1 text-gray-400 hover:text-primary transition-colors">
                         <MoreHorizontal className="w-5 h-5" />
                       </button>
                    </td>
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