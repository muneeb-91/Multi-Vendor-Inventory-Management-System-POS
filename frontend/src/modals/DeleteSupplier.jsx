import React from 'react';

// Delete confirmation modal
const DeleteSupplier = ({ supplier, onClose, onConfirm }) => {
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm z-10 p-6 space-y-4">
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto">
        <Trash2 className="w-5 h-5 text-red-500" />
      </div>
      <div className="text-center">
        <h3 className="font-bold text-primary">Remove Supplier?</h3>
        <p className="text-sm text-gray-500 mt-1">
          <span className="font-medium text-primary">{supplier.supplierName}</span> will be permanently removed.
        </p>
      </div>
      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors">
          Cancel
        </button>
        <button onClick={onConfirm} className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold cursor-pointer transition-colors">
          Remove
        </button>
      </div>
    </div>
  </div>
}

export default DeleteSupplier;
