import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const GUEST_KEY = "guestCart";

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem(GUEST_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo?.token) {
      localStorage.setItem(GUEST_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems]);

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

  const addToCart = async (product) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo?.token) {
      await axios.post(
        "http://localhost:5000/api/cart",
        { productId: product._id, qty: 1 },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      const { data } = await axios.get("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      setCartItems(data || []);
      return;
    }

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

  const removeFromCart = async (id) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // 🟢 Logged in → delete from DB
  if (userInfo?.token) {
    await axios.delete(`http://localhost:5000/api/cart/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    const { data } = await axios.get("http://localhost:5000/api/cart", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    setCartItems(data || []);
    return;
  }

  // 🟡 Guest
  setCartItems((prev) => prev.filter((x) => x._id !== id));
};



  const updateQty = async (id, qty) => {
    if (qty < 1) return;

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo?.token) {
      await axios.put(
        "http://localhost:5000/api/cart",
        { productId: id, qty },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      const { data } = await axios.get("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      setCartItems(data || []);
      return;
    }

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
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
