import React, { useState, useEffect, useMemo } from 'react';
import ProductListItem from './ProductListItem';

const ProductListingPage = () => {
  const [allProducts, setAllProducts] = useState([]);                // Original list
  const [displayedProducts, setDisplayedProducts] = useState([]);    // Filtered list
  const [searchQuery, setSearchQuery] = useState('');                // Search text
  const [selectedCategory, setSelectedCategory] = useState('All');   // Category filter
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setAllProducts(data);
        setDisplayedProducts(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = allProducts;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    setDisplayedProducts(filtered);
  }, [searchQuery, selectedCategory, allProducts]);

  const categories = useMemo(() => {
    const uniqueCats = new Set(allProducts.map(p => p.category));
    return ['All', ...Array.from(uniqueCats)];
  }, [allProducts]);

  if (loading) return <div className="text-center py-8">Loading products...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="flex-grow p-2 border rounded"
        />
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="p-2 border rounded"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProducts.length > 0 ? (
          displayedProducts.map(product => (
            <ProductListItem key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600">No products found.</div>
        )}
      </div>
    </div>
  );
};

export default ProductListingPage;
