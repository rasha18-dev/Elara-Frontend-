import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo?._id || "guest";

  const CART_KEY = `cart_${userId}`;

  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems, CART_KEY]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exist = prev.find((x) => x._id === product._id);

      if (exist) {
        return prev.map((x) =>
          x._id === product._id ? { ...x, qty: (x.qty || 1) + 1 } : x
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((x) => x._id !== id));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
