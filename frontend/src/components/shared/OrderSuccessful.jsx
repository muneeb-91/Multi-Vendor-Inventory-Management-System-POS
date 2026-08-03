import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccessful = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-secondary" />
        </div>
        <h2 className="text-2xl font-bold text-primary">Order Completed!</h2>
        <p className="text-gray-500">Receipt generated for Acme Corp.</p>
        <div className="flex gap-3 mt-2">
          <button
            onClick={() => { setCartItems([]); setOrdered(false); }}
            className="px-5 py-2.5 bg-secondary text-white rounded-lg text-sm font-semibold hover:bg-secondary/90 cursor-pointer"
          >
            New Order
          </button>
          <Link
            to="/vendor/orders"
            className="px-5 py-2.5 border border-gray-200 text-primary rounded-lg text-sm font-medium hover:bg-gray-50"
          >
            View Orders
          </Link>
        </div>
      </div>
    );
}

export default OrderSuccessful;
