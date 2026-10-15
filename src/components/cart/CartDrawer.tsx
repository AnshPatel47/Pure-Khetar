'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cart.store';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal, totalItems } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black z-50"
          />

          {/* Slide-over Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#FAF6EC] shadow-2xl z-50 flex flex-col border-l border-[#7A9A6B]/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#7A9A6B]/20 bg-white">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#1F4D2E]" />
                <h2 className="font-serif text-xl font-bold text-[#1F4D2E]">Your Organic Crate</h2>
                <span className="text-xs bg-[#7A9A6B]/20 text-[#1F4D2E] px-2 py-0.5 rounded-full font-bold">
                  {totalItems()} items
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-500 hover:text-[#1F4D2E] rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <div className="w-16 h-16 bg-[#7A9A6B]/10 rounded-full flex items-center justify-center mx-auto text-[#1F4D2E] text-2xl">
                    🧺
                  </div>
                  <p className="font-serif text-lg font-bold text-[#1F4D2E]">Your crate is empty</p>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto">
                    Add fresh vegetables, organic Ringan, or weekly baskets from Kamana farm to get started!
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="inline-block bg-[#1F4D2E] text-white text-xs font-semibold px-6 py-3 rounded-full shadow hover:bg-[#1F4D2E]/90 transition-colors"
                  >
                    Explore Harvest
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-white rounded-2xl border border-[#7A9A6B]/20 shadow-sm items-center"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-sm font-bold text-[#1F4D2E] truncate">{item.name}</h3>
                      <p className="text-xs text-gray-500">₹{item.price} / {item.unit}</p>
                      
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 text-gray-600 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-[#1F4D2E]">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 text-gray-600 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-serif text-sm font-bold text-[#1F4D2E]">₹{item.price * item.quantity}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors mt-2 p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-[#7A9A6B]/20 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-serif text-lg font-bold text-[#1F4D2E]">₹{subtotal()}</span>
                </div>
                <p className="text-[11px] text-gray-500 text-center">
                  🌱 Shipping & taxes calculated at checkout. Kamana harvest guaranteed fresh.
                </p>
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-[#1F4D2E] text-white py-4 rounded-full font-semibold hover:bg-[#1F4D2E]/90 transition-colors shadow-lg"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}