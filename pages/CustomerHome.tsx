import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/db';
import { Search, Plus, ShoppingCart, Loader2 } from 'lucide-react';
import AIChat from '../components/AIChat';
import { Product } from '../types';

const CustomerHome: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative sticky top-0 bg-gray-50 pt-2 pb-4 z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search fresh products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border-none rounded-2xl shadow-sm text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        </div>
      ) : (
        <>
          {/* Product Grid */}
          <div className="grid grid-cols-2 gap-4 pb-20">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-square bg-gray-50 rounded-xl flex items-center justify-center mb-3 text-5xl">
                    {product.image}
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm mb-1 leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">{product.category}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    className="w-8 h-8 bg-emerald-100 hover:bg-emerald-600 hover:text-white text-emerald-700 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90"
                    aria-label="Add to cart"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No products found for "{searchTerm}"</p>
            </div>
          )}
        </>
      )}

      {/* Integrate AI Assistant - pass products if needed or let it fetch */}
      <AIChat />
    </div>
  );
};

export default CustomerHome;