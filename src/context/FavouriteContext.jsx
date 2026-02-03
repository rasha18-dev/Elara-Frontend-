import { createContext, useContext, useEffect, useState } from "react";

const FavContext = createContext();

export const FavProvider = ({ children }) => {
  const [favs, setFavs] = useState(() => {
    return JSON.parse(localStorage.getItem("favs")) || [];
  });

  const addToFav = (product) => {
    setFavs(prev => {
      if (prev.find(p => p._id === product._id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromFav = (id) => {
    setFavs(prev => prev.filter(p => p._id !== id));
  };

  const isFav = (id) => favs.some(p => p._id === id);
  const clearFavs = () => {
  setFavs([]);
  localStorage.removeItem("favs");
};

  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(favs));
  }, [favs]);

  return (
    <FavContext.Provider value={{ favs, addToFav, removeFromFav, isFav, clearFavs }}>
      {children}
    </FavContext.Provider>
  );
};

export const useFav = () => useContext(FavContext);
