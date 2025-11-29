import React, { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]); // items: [{ product, quantity }]

  const addToCart = (product) => {
    setItems((prev) => {
      const found = prev.find((p) => p.product.id === product.id);
      if (found) {
        return prev.map((p) =>
          p.product.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((p) => p.product.id !== productId));
  };

  const changeQuantity = (productId, delta) => {
    setItems((prev) =>
      prev
        .map((p) => (p.product.id === productId ? { ...p, quantity: p.quantity + delta } : p))
        .filter((p) => p.quantity > 0)
    );
  };

  const clearCart = () => setItems([]);

  const totalCount = items.reduce((s, it) => s + it.quantity, 0);

  const totalPrice = items.reduce((s, it) => s + it.product.price * it.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, changeQuantity, clearCart, totalCount, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export default CartContext;
