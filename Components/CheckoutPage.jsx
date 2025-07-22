// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
  fullName: '',
  email: '',
  address: '',
  city: '',
  zip: '',
  country: '',
  paymentMethod: 'credit_card',
});

  const [isProcessing, setIsProcessing] = useState(false);
   // Corrected this line

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call for order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Order submitted:', { formData, cartItems, total: getCartTotal() });
    clearCart(); // Clear cart after successful order
    setOrderSuccess(true);
    setIsProcessing(false);
    // navigate('/order-confirmation'); // In a real app, redirect to confirmation page
  };

  if (orderSuccess) {
    return (
      <div className="container mx-auto p-4 text-center text-green-600 mt-8">
        <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
        <p className="text-lg">Thank you for your purchase. Your order will be processed shortly.</p>
        <Link to="/" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-200">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0 &&!orderSuccess) {
    return (
      <div className="container mx-auto p-4 text-center text-gray-600 mt-8">
        Your cart is empty. Please add items before checking out. <Link to="/" className="text-blue-600 hover:underline">Go to Products</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h1>
      <div className="bg-white rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Information */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
              <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
              <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">City</label>
                <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div>
                <label htmlFor="zip" className="block text-gray-700 text-sm font-bold mb-2">Zip Code</label>
                <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">Country</label>
              <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>

            {/* Payment Method */}
            <h2 className="text-xl font-semibold mt-8 mb-4">Payment Method</h2>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input type="radio" className="form-radio" name="paymentMethod" value="credit_card" checked={formData.paymentMethod === 'credit_card'} onChange={handleChange} />
                <span className="ml-2">Credit Card</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input type="radio" className="form-radio" name="paymentMethod" value="paypal" checked={formData.paymentMethod === 'paypal'} onChange={handleChange} />
                <span className="ml-2">PayPal</span>
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-green-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition duration-200"
              disabled={isProcessing}
            >
              {isProcessing? 'Processing...' : `Place Order ($${getCartTotal().toFixed(2)})`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="border rounded-md p-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center mb-2">
                <span className="text-gray-800">{item.title} (x{item.quantity})</span>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-4 mt-4 flex justify-between items-center font-bold text-lg">
              <span>Total:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;