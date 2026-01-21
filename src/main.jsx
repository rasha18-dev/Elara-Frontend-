import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { CartProvider } from "./context/CartContext.jsx";
import { FavouriteProvider } from "./context/FavouriteContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <FavouriteProvider>
        <App />
      </FavouriteProvider>
    </CartProvider>
  </React.StrictMode>
);
