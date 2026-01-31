import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const GUEST_KEY = "guestCart";

  // ✅ Load guest cart first
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem(GUEST_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Save guest cart when NOT logged in
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo?.token) {
      localStorage.setItem(GUEST_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // ✅ Load DB cart after login (on app start)
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo?.token) {
      axios
        .get("http://localhost:5000/api/cart", {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        })
        .then((res) => {
          setCartItems(res.data || []);
          localStorage.removeItem(GUEST_KEY);
        })
        .catch(() => setCartItems([]));
    }
  }, []);

  // ✅ Add to cart
  const addToCart = async (product) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    // 🟢 Logged in → save to DB
    if (userInfo?.token) {
      await axios.post(
        "http://localhost:5000/api/cart",
        {
          productId: product._id,
          qty: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      // reload DB cart
      const { data } = await axios.get("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      setCartItems(data || []);
      return;
    }

    // 🟡 Guest user → local cart
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

  // ✅ Remove from cart (frontend only for now)
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((x) => x._id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
