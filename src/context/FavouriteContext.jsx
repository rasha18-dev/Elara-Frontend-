import { createContext, useContext, useState } from "react";

const FavContext = createContext();

export const FavProvider = ({ children }) => {
  const [favs, setFavs] = useState([]);

  const addToFav = (product) => {
    setFavs((prev) => {
      if (prev.find((p) => p._id === product._id)) return prev;
      return [...prev, product];
    });
  };

  const isFav = (id) => {
    return favs.some((p) => p._id === id);
  };

  return (
    <FavContext.Provider value={{ favs, addToFav, isFav }}>
      {children}
    </FavContext.Provider>
  );
};

export const useFav = () => useContext(FavContext);
