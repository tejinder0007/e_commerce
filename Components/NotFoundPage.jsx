// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container mx-auto p-4 text-center mt-16">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-2xl text-gray-600 mt-4">Oops! The page you're looking for does not exist.</p>
      <p className="text-lg text-gray-500 mt-2">It might have been moved or deleted.</p>
      <Link to="/" className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-200">
        Go to Homepage
      </Link>
    </div>
  );
};
export default NotFoundPage;