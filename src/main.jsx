import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { CartProvider } from "./context/CartContext.jsx";
import { FavProvider } from "./context/FavouriteContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
     <FavProvider>
       <Toaster position="top-center" />
        <App />
      </FavProvider>
    </CartProvider>
  </React.StrictMode>
);
