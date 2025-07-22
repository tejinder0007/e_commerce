// App.jsx
import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from 'react-router-dom';

import Navbar from './Components/Navbar';
import ProductListingPage from './Components/ProductListingPage';
import ProductDetail from './Components/ProductDetail';
import CartPage from './Components/CartPage';
import CheckoutPage from './Components/CheckoutPage';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import ProfilePage from './Components/ProfilePage';
import NotFoundPage from './Components/NotFoundPage';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';


const RootLayout = () => (
  <AuthProvider>
    <CartProvider>
      <Navbar />
      <Outlet />
    </CartProvider>
  </AuthProvider>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<ProductListingPage />} />
      <Route path="products/:id" element={<ProductDetail />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
