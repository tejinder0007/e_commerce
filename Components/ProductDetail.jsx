import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams(); // Assuming 'id' as the dynamic parameter
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Replace with actual API call, e.g., const { product } = await productsApi.show(id);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`); // Example API
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err);
        console.error("An error occurred:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]); // Re-fetch if ID changes

  if (loading) return <div className="text-center py-8">Loading product details...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error.message}</div>;
  if (!product) return <div className="text-center py-8">Product not found.</div>;

  return (
    <div className="container mx-auto p-4 max-w-4xl bg-white rounded-lg shadow-md mt-8">
      <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-200">
        &larr; Back to Products
      </button>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img src={product.image} alt={product.title} className="w-full h-auto object-contain rounded-md" />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-xl text-blue-600 mt-2">${product.price.toFixed(2)}</p>
          <p className="text-gray-700 mt-4">{product.description}</p>
          <button className="mt-6 px-6 py-3 bg-green-600 text-white rounded-md text-lg font-semibold hover:bg-green-700 transition duration-200">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;