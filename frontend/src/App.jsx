import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "./components/layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./routes/RequireAuth.jsx";
import { fetchProducts } from "./store/slices/productsSlice.js";
import { pingBackend } from "./services/health.service.js";

// Pages
import HomePage from "./pages/HomePage";
import { AboutPage, DisclaimerPage, ReturnPolicyPage } from "./pages/LegalPages";
import NotFoundPage from "./pages/NotFoundPage";

import ShopPage from "./pages/ShopPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import OrderSuccessPage from "./pages/OrderSuccessPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

// Auth Pages
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage.jsx";

import VendorPublicPage from "./pages/vendor/VendorPublicPage";
import VendorDashboardPage from "./pages/vendor/VendorDashboardPage";
import VendorAddProductPage from "./pages/vendor/VendorAddProductPage";
import VendorEditProductPage from "./pages/vendor/VendorEditProductPage";

import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fired first and seperately from fetchProducts
    pingBackend();
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Public Pages  */}
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/vendor/:id" element={<VendorPublicPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/return-policy" element={<ReturnPolicyPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />

          {/* Any logged-in user */}
          <Route element={<RequireAuth />}>
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Vendor only */}
          <Route element={<RequireAuth roles={["vendor"]} />}>
            <Route path="/vendor-dashboard" element={<VendorDashboardPage />} />
            <Route path="/vendor-dashboard/add-product" element={<VendorAddProductPage />} />
            <Route path="/vendor-dashboard/edit-product/:id" element={<VendorEditProductPage />} />
          </Route>

          {/* Admin only */}
          <Route element={<RequireAuth roles={["admin"]} />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
