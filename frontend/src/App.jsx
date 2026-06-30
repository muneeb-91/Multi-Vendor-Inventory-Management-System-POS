import {Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import VendorRegister from './pages/VendorRegister';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import VendorLayout from './layouts/VendorLayout';
import ManagerLayout from './layouts/ManagerLayout';
import HomeLayout from './layouts/HomeLayout';

// Home Pages Import
import Home from './pages/home/Home';
import Solutions from './pages/home/Solutions';

// Admin pages imports
import SuperAdminDashboard from './pages/admin/SuperAdminDashboard';
import VendorRequests from './pages/admin/VendorRequests';
import OrdersManagement from './pages/admin/OrdersManagement';
import VendorsDirectory from './pages/admin/VendorsDirectory';
import VendorDetails from './pages/admin/VendorDetails';
import SystemAnalytics from './pages/admin/SystemAnalytics';
import SystemSettings from './pages/admin/SystemSettings';

// Vendor pages imports 
import VendorDashboard from "./pages/vendor/VendorDashboard";
import ManageProducts from "./pages/vendor/ManageProducts";
import Categories from "./pages/vendor/Categories";
import AddNewProduct from './pages/vendor/AddNewProduct';
import OrderHistory from './pages/vendor/OrderHistory';
import CreateOrder from './pages/vendor/CreateOrder';
import ManageTeam from './pages/vendor/ManageTeam';
import VendorSettings from './pages/vendor/VendorSettings'; 
import ProductDetails from './pages/vendor/ProductDetails';
import Suppliers from './pages/vendor/Suppliers';
import OrderReceipt from './pages/vendor/OrderReceipt';

// Manager pages imports
import ManagerDashboard from './pages/manager/ManagerDashboard';
import ManagerManageProducts from './pages/manager/ManagerManageProducts';
import ManagerProductDetails from './pages/manager/ManagerProductDetails';
import ManagerOrderHistory from './pages/manager/ManagerOrderHistory';
import ManagerCreateOrder from './pages/manager/ManagerCreateOrder';
import ManagerOrderReceipt from './pages/manager/ManagerOrderReceipt';
import ManagerNotifications from './pages/manager/ManagerNotifications';
import Pricing from './pages/home/Pricing';

function App() {

  return (
    <div className='border-box'>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/vendor-register' element={<VendorRegister />}/>

        <Route path='/' element={<HomeLayout/>}>
          <Route index element={<Home/>}/>
          <Route path='solutions' element={<Solutions/>}/>
          <Route path='pricing' element={<Pricing/>}/>
        </Route>

        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<SuperAdminDashboard />}/>
          <Route path='vendors' element={<VendorsDirectory />}/>
          <Route path='vendors/:id' element={<VendorDetails />}/>
          <Route path='vendor-requests' element={<VendorRequests />}/>
          <Route path='orders' element={<OrdersManagement />}/>
          <Route path='reports' element={<SystemAnalytics />}/>
          <Route path='settings' element={<SystemSettings />}/>
        </Route>

        <Route path="/vendor" element={<VendorLayout />}>
          <Route index element={<VendorDashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="add-product" element={<AddNewProduct />} />
          <Route path="orders" element={<OrderHistory />} />
          <Route path="create-order" element={<CreateOrder />} />
          <Route path="managers" element={<ManageTeam />} />
          <Route path="settings" element={<VendorSettings />} />
          <Route path="order-receipt" element={<OrderReceipt />} />
        </Route>

        <Route path='/manager' element={<ManagerLayout/>}>
          <Route index element={<ManagerDashboard />} />
          <Route path='products' element={<ManagerManageProducts />} />
          <Route path='products/:id' element={<ManagerProductDetails />} />
          <Route path='orders' element={<ManagerOrderHistory />} />
          <Route path='create-order' element={<ManagerCreateOrder />} />
          <Route path='order-receipt' element={<ManagerOrderReceipt />} />
          <Route path='notifications' element={<ManagerNotifications />} />
        </Route>

        <Route path='*' element={<Navigate to='/login' replace />}/>
      </Routes>
    </div>
  )
}

export default App
