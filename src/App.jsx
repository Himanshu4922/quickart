import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import SingleProduct from "./pages/SingleProduct";
import ErrorPage from "./pages/ErrorPage";
import { GlobalStyles } from "./pages/GlobalStyles";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./utils/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29 ,29, 29, .8)",
      white: "#fff",
      black: " #212529",
      helper: "#8490ff",

      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "910px",
      tab: "998px",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <GlobalStyles />
          <Header />
          <Routes>
            <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/singleproduct/:id" element={<SingleProduct />} />
            <Route path="cart" element={<Cart />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
