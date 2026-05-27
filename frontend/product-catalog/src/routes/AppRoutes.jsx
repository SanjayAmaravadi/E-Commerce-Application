import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import CartPage from "../pages/CartPage";
import WishlistPage from "../pages/WishlistPage";
import AdminDashboard from "../pages/AdminDashboard";
import AddProductPage from "../pages/AddProductPage";
import UpdateProductPage from "../pages/UpdateProductPage";
import OrdersPage from "../pages/OrdersPage";
import AdminOrdersPage from "../pages/AdminOrdersPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import AddCategoryPage from "../pages/AddCategoryPage";
import AdminSetupPage from "../pages/AdminSetupPage";
import AdminManagementPage from "../pages/AdminManagementPage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import VerifyOtpPage from "../pages/VerifyOtpPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import CheckoutPage from "../pages/CheckoutPage";

import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "../components/AdminRoute";
import SuperAdminRoute from "../components/SuperAdminRoute";
import AdminSettingsPage from "../pages/AdminSettingsPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC */}

      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-otp" element={<VerifyOtpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/admin/setup/:token" element={<AdminSetupPage />} />

      {/* PRODUCT */}
      <Route path="/products/:id" element={<ProductDetailsPage />} />

      {/* PROTECTED */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />

      {/* <Route path="/payment-success" element={<PaymentSuccessPage />} /> */}

      {/* <Route path="/checkout" element={<CheckoutPage />} />  */}

      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <WishlistPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/add-product"
        element={
          <AdminRoute>
            <AddProductPage />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/add-category"
        element={
          <AdminRoute>
            <AddCategoryPage />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/settings"
        element={
          <AdminRoute>
            <AdminSettingsPage />
          </AdminRoute>
        }
      />

      {/* <Route path="/admin/settings" element={<AdminSettingsPage />} /> */}

      <Route
        path="/admin/update-product/:id"
        element={
          <AdminRoute>
            <UpdateProductPage />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <AdminRoute>
            <AdminOrdersPage />
          </AdminRoute>
        }
      />

      <Route
        path="/super-admin/admins"
        element={
          <SuperAdminRoute>
            <AdminManagementPage />
          </SuperAdminRoute>
        }
      />

      {/* Invalid url */}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export default AppRoutes;
