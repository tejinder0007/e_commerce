// src/components/Navbar.jsx
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // Assuming useAuth hook

const Navbar = () => {
  const { cartItems } = useCart();
  const { isAuthenticated, logout } = useAuth(); // Assuming auth state and logout function

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">E-Shop</Link>
        <div className="flex space-x-4">
          <NavLink to="/" className={({ isActive }) => isActive? 'text-blue-400' : 'hover:text-gray-300'}>Products</NavLink>
          <NavLink to="/cart" className={({ isActive }) => isActive? 'text-blue-400' : 'hover:text-gray-300'}>
            Cart ({cartItems.length})
          </NavLink>
          {isAuthenticated? (
            <>
              <NavLink to="/profile" className={({ isActive }) => isActive? 'text-blue-400' : 'hover:text-gray-300'}>Profile</NavLink>
              <button onClick={logout} className="hover:text-gray-300">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => isActive? 'text-blue-400' : 'hover:text-gray-300'}>Login</NavLink>
              <NavLink to="/register" className={({ isActive }) => isActive? 'text-blue-400' : 'hover:text-gray-300'}>Register</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;