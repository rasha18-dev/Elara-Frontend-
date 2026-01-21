import { createContext, useContext, useEffect, useState } from "react";

const FavContext = createContext();

export const FavouriteProvider = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo?._id || "guest";

  const FAV_KEY = `fav_${userId}`;

  const [favItems, setFavItems] = useState(() => {
    return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
  });

  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(favItems));
  }, [favItems, FAV_KEY]);

  const addToFav = (product) => {
    setFavItems((prev) => {
      if (prev.find((x) => x._id === product._id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromFav = (id) => {
    setFavItems((prev) => prev.filter((x) => x._id !== id));
  };

  const isFav = (id) => favItems.some((x) => x._id === id);

  const clearFav = () => setFavItems([]);

  return (
    <FavContext.Provider
      value={{ favItems, addToFav, removeFromFav, isFav, clearFav }}
    >
      {children}
    </FavContext.Provider>
  );
};

export const useFav = () => useContext(FavContext);
