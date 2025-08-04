import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from '../App';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import ShippingPage from '../pages/ShippingPage';
import PaymentPage from '../pages/PaymentPage';
import PlaceOrderPage from '../pages/PlaceOrderPage';
import OrderDetailsPage from '../pages/OrderDetailsPage';
import CategoryPage from '../pages/CategoryPage';
import VerifyOtpPage from '../pages/VerifyOtpPage';
import NotFoundPage from '../pages/NotFoundPage';

// --- NEW: Import the forgot password pages ---
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import VerifyResetOtpPage from '../pages/VerifyResetOtpPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
// ------------------------------------------

// Route Protection Components
import PrivateRoute from '../components/PrivateRoute';
import AdminRoute from '../components/AdminRoute';

// Admin Pages
import UserListPage from '../pages/admin/UserListPage';
import UserEditPage from '../pages/admin/UserEditPage';
import ProductListPage from '../pages/admin/ProductListPage';
import ProductFormPage from '../pages/admin/ProductFormPage';
import OrderListPage from '../pages/admin/OrderListPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // --- Public User Routes ---
      { index: true, path: '/', element: <HomePage /> },
      { path: 'page/:pageNumber', element: <HomePage /> },
      { path: 'search/:keyword', element: <HomePage /> },
      { path: 'search/:keyword/page/:pageNumber', element: <HomePage /> },
      { path: 'product/:id', element: <ProductPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'verify-otp', element: <VerifyOtpPage /> },
      { path: 'category/:categoryName', element: <CategoryPage /> },
      { path: 'category/:categoryName/page/:pageNumber', element: <CategoryPage /> },
      
      // --- Forgot Password Routes ---
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'verify-reset-otp', element: <VerifyResetOtpPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
      // -----------------------------

      // --- Private User Routes (Must be logged in) ---
      {
        path: '',
        element: <PrivateRoute />,
        children: [
          { path: 'shipping', element: <ShippingPage /> },
          { path: 'payment', element: <PaymentPage /> },
          { path: 'place-order', element: <PlaceOrderPage /> },
          { path: 'order/:id', element: <OrderDetailsPage /> },
          { path: 'profile', element: <ProfilePage /> },
        ],
      },

      // --- Admin Routes (Must be logged in AND an admin) ---
      {
        path: 'admin',
        element: <AdminRoute />,
        children: [
          { path: 'userlist', element: <UserListPage /> },
          { path: 'user/:id/edit', element: <UserEditPage /> },
          { path: 'productlist', element: <ProductListPage /> },
          { path: 'product/create', element: <ProductFormPage /> },
          { path: 'product/:id/edit', element: <ProductFormPage /> },
          { path: 'orderlist', element: <OrderListPage /> },
        ],
      },
    ],
  },
  // Catch-all 404 Route for any other path
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
