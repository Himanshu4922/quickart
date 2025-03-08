import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import reportWebVitals from "./pages/reportWebVitals";
import { AppProvider } from "./context/ProductContext";
import { FilterContextProvider } from "./context/FilterContext";
import App from "./App.jsx";
import {CartProvider}  from './context/CartContext';

createRoot(document.getElementById("root")).render(
  <AppProvider>
    <FilterContextProvider>
      <CartProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </CartProvider>
    </FilterContextProvider>
  </AppProvider>
);
