// src/pages/CartPage.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center text-gray-600 mt-8">
        Your cart is empty. <Link to="/" className="text-blue-600 hover:underline">Start shopping!</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center justify-between border-b pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
            <div className="flex items-center">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md mr-4" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-200"
              >
                -
              </button>
              <span className="mx-3 text-lg font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-200"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-4 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="text-right mt-6">
          <h2 className="text-2xl font-bold text-gray-900">Total: ${getCartTotal().toFixed(2)}</h2>
          <Link to="/checkout" className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-200">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CartPage;