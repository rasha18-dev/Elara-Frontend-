import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { CartProvider } from "./context/CartContext.jsx";
import { FavProvider } from "./context/FavouriteContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
     <FavProvider>
        <App />
      </FavProvider>
    </CartProvider>
  </React.StrictMode>
);
