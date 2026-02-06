import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const GUEST_KEY = "guestCart";

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem(GUEST_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // Save guest cart
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo?.token) {
      localStorage.setItem(GUEST_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Sync guest cart after login
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const guestCart = JSON.parse(localStorage.getItem(GUEST_KEY)) || [];

    if (userInfo?.token) {
      const syncCart = async () => {
        try {
          // Push guest cart into DB
          for (let item of guestCart) {
            await axios.post("/cart", { productId: item._id, qty: item.qty });
          }

          // Fetch final cart
          const { data } = await axios.get("/cart");

          setCartItems(data || []);
          localStorage.removeItem(GUEST_KEY);
        } catch (err) {
          console.log("Cart sync error:", err);
        }
      };

      syncCart();
    }
  }, []);

  // Add to cart
  const addToCart = async (product) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo?.token) {
      try {
        await axios.post("/cart", { productId: product._id, qty: 1 });
        const { data } = await axios.get("/cart");
        setCartItems(data || []);
      } catch (err) {
        console.log("Add to cart error:", err);
      }
      return;
    }

    // Guest cart
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

  // Remove from cart
  const removeFromCart = async (id) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo?.token) {
      try {
        await axios.delete(`/cart/${id}`);
        const { data } = await axios.get("/cart");
        setCartItems(data || []);
      } catch (err) {
        console.log("Remove cart error:", err);
      }
      return;
    }

    // Guest
    setCartItems((prev) => prev.filter((x) => x._id !== id));
  };

  // Update quantity
  const updateQty = async (id, qty) => {
    if (qty < 1) return;

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo?.token) {
      try {
        await axios.put("/cart", { productId: id, qty });
        const { data } = await axios.get("/cart");
        setCartItems(data || []);
      } catch (err) {
        console.log("Update qty error:", err);
      }
      return;
    }

    // Guest
    setCartItems((prev) =>
      prev.map((x) =>
        (x.productId?._id || x._id) === id ? { ...x, qty } : x
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(GUEST_KEY);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
