import React, { useState, useEffect } from 'react';
// Assume productsApi is configured for fetching data
// import productsApi from 'apis/products';
import ProductListItem from './ProductListItem'; // Assuming ProductListItem is in the same directory

const ProductList = () => {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Replace with actual API call, e.g., const { products } = await productsApi.fetch();
        const response = await fetch('https://fakestoreapi.com/products'); // Example API for demonstration
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data); // Assuming data is directly the array of products
      } catch (err) {
        setError(err);
        console.error("An error occurred:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  },);

  if (loading) return <div className="text-center py-8">Loading products...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  );
};
export default ProductList;