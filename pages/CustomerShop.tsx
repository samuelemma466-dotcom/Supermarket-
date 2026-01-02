import React, { useState } from 'react';
import { PRODUCTS } from '../services/realtimeData';
import { ShoppingCart, Plus, Check } from 'lucide-react';
import AIChat from '../components/AIChat';
import { Product } from '../types';

const CustomerShop: React.FC = () => {
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Fresh & Organic Groceries</h1>
          <p className="text-emerald-50 text-lg mb-6">
            Get your daily essentials delivered right to your doorstep. Browse our fresh collection today.
          </p>
          <div className="flex gap-4">
             <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg">
                <span className="font-bold">{PRODUCTS.length}</span> Products Available
             </div>
             <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg">
                <span className="font-bold">Fast</span> Delivery
             </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 transform translate-x-10"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product Grid */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col"
              >
                <div className="flex items-center justify-center bg-gray-50 rounded-xl h-40 mb-4 text-6xl">
                  {product.image}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-1 rounded-full">{product.category}</span>
                        <h3 className="text-lg font-bold text-gray-900 mt-2">{product.name}</h3>
                    </div>
                    <span className="text-lg font-bold text-emerald-600">${product.price.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full mt-4 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-95"
                >
                  <Plus className="w-4 h-4" /> Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Sidebar */}
        <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 sticky top-24">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50 rounded-t-2xl">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5 text-emerald-600" />
                        Your Cart
                    </h2>
                    <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {cart.reduce((a, b) => a + b.qty, 0)} items
                    </span>
                </div>
                
                <div className="p-6 max-h-[400px] overflow-y-auto space-y-4">
                    {cart.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                            Your cart is empty
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.product.id} className="flex justify-between items-center group">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{item.product.image}</span>
                                    <div>
                                        <div className="font-medium text-sm">{item.product.name}</div>
                                        <div className="text-xs text-gray-500">
                                            {item.qty} x ${item.product.price.toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                                <div className="font-semibold text-sm">
                                    ${(item.qty * item.product.price).toFixed(2)}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-600 font-medium">Total</span>
                        <span className="text-2xl font-bold text-gray-900">${cartTotal.toFixed(2)}</span>
                    </div>
                    <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors shadow-emerald-200 shadow-lg">
                        Checkout Now
                    </button>
                </div>
            </div>
        </div>
      </div>
      
      {/* Gemini Chat Component */}
      <AIChat />
    </div>
  );
};

export default CustomerShop;