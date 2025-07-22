import React from 'react';
import { Link } from 'react-router-dom';

const ProductListItem = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
      <Link to={`/products/${product.id}`}> {/* Using product.id as slug for simplicity */}
        <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h3>
          <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
            View Details
          </button>
        </div>
      </Link>
    </div>
  );
};
export default ProductListItem;