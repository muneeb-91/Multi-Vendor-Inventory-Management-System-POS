import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoutes";
import PublicRoute from './components/publicRoute';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuthRequest } from "./features/auth/authAPI";
import { checkAuthSuccess, checkAuthFailure } from "./features/auth/authSlice";

// Login and Vendor Register Imports
import Login from "./pages/Login";
import VendorRegister from "./pages/VendorRegister";

// Layout Imports
import AdminLayout from "./layouts/AdminLayout";
import VendorLayout from "./layouts/VendorLayout";
import ManagerLayout from "./layouts/ManagerLayout";
import HomeLayout from "./layouts/HomeLayout";

// Home Pages Import
import Home from "./pages/home/Home";
import Solutions from "./pages/home/Solutions";

// Admin pages imports
import SuperAdminDashboard from "./pages/admin/SuperAdminDashboard";
import VendorRequests from "./pages/admin/VendorRequests";
import OrdersManagement from "./pages/admin/OrdersManagement";
import VendorsDirectory from "./pages/admin/VendorsDirectory";
import VendorDetails from "./pages/admin/VendorDetails";
import SystemAnalytics from "./pages/admin/SystemAnalytics";
import SystemSettings from "./pages/admin/SystemSettings";

// Vendor pages imports
import VendorDashboard from "./pages/vendor/VendorDashboard";
import ManageProducts from "./pages/vendor/ManageProducts";
import Categories from "./pages/vendor/Categories";
import AddNewProduct from "./pages/vendor/AddNewProduct";
import OrderHistory from "./pages/vendor/OrderHistory";
import CreateOrder from "./pages/vendor/CreateOrder";
import ManageTeam from "./pages/vendor/ManageTeam";
import VendorSettings from "./pages/vendor/VendorSettings";
import ProductDetails from "./pages/vendor/ProductDetails";
import Suppliers from "./pages/vendor/Suppliers";
import OrderReceipt from "./pages/vendor/OrderReceipt";

// Manager pages imports
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import ManagerManageProducts from "./pages/manager/ManagerManageProducts";
import ManagerProductDetails from "./pages/manager/ManagerProductDetails";
import ManagerOrderHistory from "./pages/manager/ManagerOrderHistory";
import ManagerCreateOrder from "./pages/manager/ManagerCreateOrder";
import ManagerOrderReceipt from "./pages/manager/ManagerOrderReceipt";
import ManagerNotifications from "./pages/manager/ManagerNotifications";
import Pricing from "./pages/home/Pricing";
import Loader from "./components/Loader";
import { use } from "react";
import AccountStatus from "./pages/home/AccountStatus";

function App() {
  const { checkingAuth, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await checkAuthRequest();

        dispatch(
          checkAuthSuccess({
            user: res.user,
          }),
        );
      } catch (error) {
        dispatch(checkAuthFailure());
        console.log(error);
      }
    };

    checkAuth();
  }, []);

  if (checkingAuth && !isAuthenticated) {
    return <Loader className={`h-screen`} />;
  }

  return (
    <div className="border-box">
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/vendor-register"
          element={
            <PublicRoute>
              <VendorRegister />
            </PublicRoute>
          }
        />

        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="solutions" element={<Solutions />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="account-status" element={<AccountStatus />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<SuperAdminDashboard />} />
          <Route path="vendors" element={<VendorsDirectory />} />
          <Route path="vendors/:id" element={<VendorDetails />} />
          <Route path="vendor-requests" element={<VendorRequests />} />
          <Route path="orders" element={<OrdersManagement />} />
          <Route path="reports" element={<SystemAnalytics />} />
          <Route path="settings" element={<SystemSettings />} />
        </Route>

        <Route
          path="/vendor"
          element={
            <ProtectedRoute allowedRoles={["vendor"]}>
              <VendorLayout />
            </ProtectedRoute>
          }
        >
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

        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <ManagerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ManagerDashboard />} />
          <Route path="products" element={<ManagerManageProducts />} />
          <Route path="products/:id" element={<ManagerProductDetails />} />
          <Route path="orders" element={<ManagerOrderHistory />} />
          <Route path="create-order" element={<ManagerCreateOrder />} />
          <Route path="order-receipt" element={<ManagerOrderReceipt />} />
          <Route path="notifications" element={<ManagerNotifications />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
