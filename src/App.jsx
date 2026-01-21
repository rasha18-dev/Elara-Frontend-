import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OtpVerify from "./pages/Otpverify";
import ImageUpload from "./pages/ImageUpload";

import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetails";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminAddProduct from "./pages/admin/AdminAddProduct";
import AdminEditProduct from "./pages/admin/AdminEditProduct";

import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckOutPage";
import Profile from "./pages/Profile";
import MyOrders from "./pages/MyOrders";
import Favourites from "./pages/Favourites";
import CustomizationPage from "./pages/CustomizationPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderDetails from "./pages/OrderDetails";
import AdminOrders from "./pages/admin/AdminOrders";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

          <ToastContainer position="top-right" autoClose={2000} />
      <div className="pt-16">
        <Routes>
          {/* ✅ PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/customization" element={<CustomizationPage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/upload" element={<ImageUpload />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/order/:id" element={<OrderDetails />} />

          {/* ✅ ADMIN ROUTES */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/add" element={<AdminAddProduct />} />
            <Route path="products/:id/edit" element={<AdminEditProduct />} />
           <Route path="orders" element={<AdminOrders />} />

          </Route>

          {/* ✅ OTP PROTECTED ROUTE */}
          <Route
            path="/verify-otp"
            element={
              <ProtectedRoute>
                <OtpVerify />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
