const ProductReducer = (state, action) => {
    // if (action.type === "SET_LOADING") {
    //   return {
    //     ...state,
    //     isLoading: true,
    //   };
    // }
  
    // if (action.type === "API_ERROR") {
    //   return {
    //     ...state,
    //     isLoading: false,
    //     isError: true,
    //   };
    // }
  
    switch (action.type) {
      case "SET_LOADING":
        return {
          ...state,
          isLoading: true,
        };
  
      case "SET_API_DATA":
        const featureData = action.payload.products.filter((curElem) => {
          return curElem.rating >= 4;
        });
  
        return {
          ...state,
          isLoading: false,
          prod: action.payload.products,
          featureProducts: featureData,
        };
  
      case "API_ERROR":
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
  
      case "SET_SINGLE_LOADING":
        return {
          ...state,
          isSingleLoading: true,
        };
  
      case "SET_SINGLE_PRODUCT":
        return {
          ...state,
          isSingleLoading: false,
          singleProduct: action.payload,
        };
  
      case "SET_SINGLE_ERROR":
        return {
          ...state,
          isSingleLoading: false,
          isError: true,
        };
  
      default:
        return state;
    }
  };
  
  export default ProductReducer;
import React from "react";
import HeroSection from './../components/HeroSection';

const About = () => {
  const data = {
    name: "Bisht Ecommerce",
  };

  return <HeroSection data={data} />;
};

export default About;
import styled from "styled-components";
import { useCartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { Button } from "./../styles/Button";
import { NavLink } from "react-router-dom";
import FormatPrice from "./../Helpers/FormatPrice";

const Cart = () => {
  const { cart, clearCart, total_item, total_price, shipping_fee } =
    useCartContext();
  // console.log("🚀 ~ file: Cart.js ~ line 6 ~ Cart ~ cart", cart);

  if (cart && cart.length === 0) {
    return (
      <EmptyDiv>
        <h3>No Item in Cart </h3>
      </EmptyDiv>
    );
  }
  return (
    <Wrapper>
      <div className="container">
        <div className="cart_heading grid grid-five-column">
          <p>Item</p>
          <p className="cart-hide">Price</p>
          <p>Quantity</p>
          <p className="cart-hide">Subtotal</p>
          <p>Remove</p>
        </div>
        <hr />

        <div className="cart-item">
          {cart &&
            cart.map((curElem) => {
              return curElem && <CartItem key={curElem.id} {...curElem} />;
            })}
          <hr />
          <div className="cart-two-button">
            <NavLink to="/products">
              <Button> continue Shopping </Button>
            </NavLink>
            <Button className="btn btn-clear" onClick={clearCart}>
              clear cart
            </Button>
          </div>

          {/* order total_amount */}
          <div className="order-total--amount">
            <div className="order-total--subdata">
              <div>
                <p>subtotal:</p>
                <p>
                  <FormatPrice price={total_price} />
                </p>
              </div>
              <div>
                <p>shipping fee:</p>
                <p>
                  <FormatPrice price={shipping_fee} />
                </p>
              </div>
              <hr />
              <div>
                <p>order total:</p>
                <p>
                  <FormatPrice price={shipping_fee + total_price} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const EmptyDiv = styled.div`
  display: grid;
  place-items: center;
  height: 50vh;

  h3 {
    font-size: 4.2rem;
    text-transform: capitalize;
    font-weight: 300;
  }
`;

const Wrapper = styled.section`
  padding: 9rem 0;

  .grid-four-column {
    grid-template-columns: repeat(4, 1fr);
  }

  .grid-five-column {
    grid-template-columns: repeat(4, 1fr) 0.3fr;
    text-align: center;
    align-items: center;
  }
  .cart-heading {
    text-align: center;
    text-transform: uppercase;
  }
  hr {
    margin-top: 1rem;
  }
  .cart-item {
    padding: 3.2rem 0;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }

  .cart-user--profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.2rem;
    margin-bottom: 5.4rem;

    img {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
    }
    h2 {
      font-size: 2.4rem;
    }
  }
  .cart-user--name {
    text-transform: capitalize;
  }
  .cart-image--name {
    /* background-color: red; */
    align-items: center;
    display: grid;
    gap: 1rem;
    grid-template-columns: 0.4fr 1fr;
    text-transform: capitalize;
    text-align: left;
    img {
      max-width: 5rem;
      height: 5rem;
      object-fit: contain;
      color: transparent;
    }

    .color-div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;

      .color-style {
        width: 1.4rem;
        height: 1.4rem;

        border-radius: 50%;
      }
    }
  }

  .cart-two-button {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;

    .btn-clear {
      background-color: #e74c3c;
    }
  }

  .amount-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }

  .remove_icon {
    font-size: 1.6rem;
    color: #e74c3c;
    cursor: pointer;
  }

  .order-total--amount {
    width: 100%;
    margin: 4.8rem 0;
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    .order-total--subdata {
      border: 0.1rem solid #f0f0f0;
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
      padding: 3.2rem;
    }
    div {
      display: flex;
      gap: 3.2rem;
      justify-content: space-between;
    }

    div:last-child {
      background-color: #fafafa;
    }

    div p:last-child {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.heading};
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-five-column {
      grid-template-columns: 1.5fr 1fr 0.5fr;
    }
    .cart-hide {
      display: none;
    }

    .cart-two-button {
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
      gap: 2.2rem;
    }

    .order-total--amount {
      width: 100%;
      text-transform: capitalize;
      justify-content: flex-start;
      align-items: flex-start;

      .order-total--subdata {
        width: 100%;
        border: 0.1rem solid #f0f0f0;
        display: flex;
        flex-direction: column;
        gap: 1.8rem;
        padding: 3.2rem;
      }
    }
  }
`;

export default Cart;
import styled from "styled-components";
import Footer from './../components/Footer';

const Contact = () => {
  const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;

  return (
    <>
      <Wrapper>
        <h2 className="common-heading">Contact page</h2>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.600403613772!2d77.10408087550115!3d28.641736075659736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0363c4edf747%3A0x240c75aa3d09de7a!2sPacific%20Mall!5e0!3m2!1sen!2sin!4v1729348539175!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <div className="container">
          <div className="contact-form">
            <form
              action="https://formspree.io/f/xwpkkgnw"
              method="POST"
              className="contact-inputs"
            >
              <input
                type="text"
                placeholder="username"
                name="username"
                required
                autoComplete="off"
              />

              <input
                type="email"
                name="Email"
                placeholder="Email"
                autoComplete="off"
                required
              />

              <textarea
                name="Message"
                cols="30"
                rows="10"
                required
                autoComplete="off"
                placeholder="Enter you message"
              ></textarea>

              <input type="submit" value="send" />
            </form>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Contact;
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";

const ErrorPage = () => {
  return (
    <Wrapper>
      <div className="container">
        <div>
          <h2>404</h2>
          <h3>UH OH! You're lost.</h3>
          <p>
            The page you are looking for does not exist. How you got here is a
            mystery. But you can click the button below to go back to the
            homepage.
          </p>

          <NavLink to="/">
            <Button>Go Back to Home</Button>
          </NavLink>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
    text-align: center;

    h2 {
      font-size: 10rem;
    }

    h3 {
      font-size: 4.2rem;
    }

    p {
      margin: 2rem 0;
    }
  }
`;

export default ErrorPage;
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Work Sans", sans-serif;
}


html {
  font-size: 62.5%;
  /* scroll-behavior: smooth; */
  /* 1rem = 10px */
  overflow-x: hidden;
}

body {
  overflow-x: hidden;
   scrollbar-color: rgb(98 84 243);
    scrollbar-width: thin;
}

body::-webkit-scrollbar {
  width: 1.5rem;
}

body::-webkit-scrollbar-track {
   background-color: rgb(24 24 29);
}

body::-webkit-scrollbar-thumb {
 
  background: #fff;
    border: 5px solid transparent;
    border-radius: 9px;
    background-clip: content-box;
}

h1,
h2,
h3,
h4 {
   font-family: "Work Sans", sans-serif;

}

h1 {
  color: ${({ theme }) => theme.colors.heading};
  font-size: 6rem;
  font-weight: 900;
}

 h2 {
   color: ${({ theme }) => theme.colors.heading};
   font-size: 4.4rem;
   font-weight: 300;
   white-space: normal;
  
  }

h3 {
  font-size: 1.8rem;
  font-weight: 400;
}

p, button {
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.65rem;
  line-height: 1.5;
  font-weight:400;
}

a {
  text-decoration: none;
}

li {
  list-style: none;
}


${"" /* resuable code section  */}

.container {
  max-width: 120rem;
  margin: 0 auto;
}

.grid {
  display: grid;
  gap: 9rem;
}

.grid-two-column {
  grid-template-columns: repeat(2, 1fr);

}

.grid-three-column {
  grid-template-columns: repeat(3, 1fr);
}

.grid-four-column{
   grid-template-columns: 1fr 1.2fr .5fr .8fr ;
}

.grid-five-column{
  grid-template-columns: repeat(5, 1fr);
}

  .common-heading {
      font-size: 3.8rem;
      font-weight: 600;
      margin-bottom: 6rem;
      text-transform: capitalize;
    }

     .intro-data {
      margin-bottom: 0;
      text-transform: uppercase;
      color: #5138ee;
    }

   .caption {
      position: absolute;
      top: 15%;
      right: 10%;
      text-transform: uppercase;
      background-color: ${({ theme }) => theme.colors.bg};
      color: ${({ theme }) => theme.colors.helper};
      padding: 0.8rem 2rem;
      font-size: 1.2rem;
      border-radius: 2rem;
    }

input, textarea{
    max-width: 50rem;
    color: ${({ theme }) => theme.colors.black};
    padding: 1.6rem 2.4rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    text-transform: none;
   box-shadow: ${({ theme }) => theme.colors.shadowSupport};
}
    input[type="submit"]{
    max-width: 16rem;
    margin-top: 2rem;
    background-color: ${({ theme }) => theme.colors.btn};
    color: ${({ theme }) => theme.colors.white};
    padding: 1.4rem 2.2rem;
    border-style: solid;
    border-width: .1rem;
    text-transform: uppercase;
    font-size: 1.8rem;
    cursor: pointer;
    }

@media (max-width: ${({ theme }) => theme.media.tab}) {
    .container {
    max-width: 130rem;
    padding: 0 3.2rem;
  }
  }

   @media (max-width: ${({ theme }) => theme.media.mobile}) {
       html {
      font-size: 50%;
    }

.grid{
  gap: 3.2rem;
}
      .grid-two-column , .grid-three-column, .grid-four-column{
          grid-template-columns: 1fr;
        }
    }

`;
import HeroSection from "../components/HeroSection";
import Services from "../components/Services";
import Trusted from "../components/Trusted";
import FeatureProduct from "./../components/FeatureProduct";

const Home = () => {
  const data = {
    name: "Bisht store",
  };

  return (
    <>
      <HeroSection data={data} />
      <FeatureProduct />
      <Services />
      <Trusted />
    </>
  );
};

export default Home;
import React from "react";
import styled from "styled-components";
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { Button } from "./../styles/Button";

const Login = () => {
  const { user, loginUser } = useAuth();
  const navigate = useNavigate();

  const loginForm = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = loginForm.current.email.value.trim();
    const password = loginForm.current.password.value.trim();

    const userInfo = {
      email,
      password,
    };

    console.log("Attempting login with userInfo:", userInfo);

    loginUser(userInfo);
  };

  useEffect(() => {
    if (user) {
      console.log("user state in useEffect:", user);
      navigate("/");
    }
  }, [user, navigate]);

  console.log("user state before render:", user);
  return (
    <Wrapper>
      <div className="container">
        <h2 className="common-heading">Login</h2>
        <form
          ref={loginForm}
          onSubmit={(e) => handleSubmit(e)}
          className="login-form"
        >
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              placeholder="Enter your password"
            />
          </div>
          <Button type="submit" value="login" >
            Login
          </Button>
        </form>
        <p>
          Don't have an account?
          <Link to="/register">
            <span> Register</span>
          </Link>
        </p>
      </div>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.section`
  //   background-color: ${({ theme }) => theme.colors.bg};
  padding: 4rem 4rem;

  .container {
    max-width: 40rem;
    margin: 0 auto;
    background: ${({ theme }) => theme.colors.white};
    padding: 3rem;
    box-shadow: ${({ theme }) => theme.colors.shadow};
    border-radius: 8px;
  }

  .common-heading {
    text-align: center;
    color: ${({ theme }) => theme.colors.heading};
    font-size: 3.8rem;
    font-weight: 600;
    margin-bottom: 2rem;
  }


  span {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.65rem;
    line-height: 1.5;
  }
  span:hover {
    color: rgb(98 84 243);
    cursor: pointer;
  }
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;

    .form-field {
      display: flex;
      flex-direction: column;
      label {
        font-size: 1.6rem;
        color: ${({ theme }) => theme.colors.text};
        margin-bottom: 0.5rem;
      }
      input {
        width: 100%;
        padding: 1rem 1.5rem;
        font-size: 1.6rem;
        border: 1px solid ${({ theme }) => theme.colors.border};
        border-radius: 4px;
        color: ${({ theme }) => theme.colors.black};
        text-transform: none;
        box-shadow: ${({ theme }) => theme.colors.shadowSupport};
        &:focus {
          outline: none;
          border-color: ${({ theme }) => theme.colors.helper};
        }
      }
    }

    input[type="submit"] {
      width: 100%;
      padding: 1rem;
      background-color: ${({ theme }) => theme.colors.btn};
      color: ${({ theme }) => theme.colors.white};
      font-size: 1.8rem;
      font-weight: bold;
      cursor: pointer;
      border: none;
      border-radius: 4px;
      transition: background-color 0.3s ease;
      &:hover {
        background-color: ${({ theme }) => theme.colors.helper};
      }
    }
  }
`;
import styled from "styled-components";
import FilterSection from "../components/FilterSection";
import ProductList from "../components/ProductList";
import Sort from "../components/Sort";
import { useFilterContext } from "../context/FilterContext";

const Products = () => {
  return (
    <Wrapper>
      <div className="container grid grid-filter-column">
        <div>
          <FilterSection />
        </div>

        <section className="product-view--sort">
          <div className="sort-filter">
            <Sort />
          </div> 
          <div className="main-product">
            <ProductList />
          </div>
        </section>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .grid-filter-column {
    grid-template-columns: 0.2fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-filter-column {
      grid-template-columns: 1fr;
    }
  }
`;

export default Products;
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { Button } from "./../styles/Button";

const Register = () => {
  const registerForm = useRef(null);
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("inside function");

    const name = registerForm.current.name.value.trim();
    const email = registerForm.current.email.value.trim();
    const password1 = registerForm.current.password1.value.trim();
    const password2 = registerForm.current.password2.value.trim();

    if (password1 !== password2) {
      alert("Passwords didn't match");
      return;
    }

    const userInfo = {
      name,
      email,
      password1,
      password2,
    };

    registerUser(userInfo);
  };
  useEffect(() => {
    if (user) {
      console.log("in effect");
      navigate("/");
    }
  }, [user]);

  return (
    <Wrapper>
      <div className="container">
        <h2 className="common-heading">Register</h2>
        <form
          ref={registerForm}
          onSubmit={handleRegister}
          className="register-form"
        >
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password1"
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              name="password2"
              required
              placeholder="Enter your password"
            />
          </div>

          <Button type="submit">Register</Button>
        </form>
      </div>
    </Wrapper>
  );
};

export default Register;

const Wrapper = styled.section`
  padding: 4rem 4rem;

  .container {
    max-width: 40rem;
    margin: 0 auto;
    background: ${({ theme }) => theme.colors.white};
    padding: 3rem;
    box-shadow: ${({ theme }) => theme.colors.shadow};
    border-radius: 8px;
  }

  .common-heading {
    text-align: center;
    color: ${({ theme }) => theme.colors.heading};
    font-size: 3.8rem;
    font-weight: 600;
    margin-bottom: 2rem;
  }

  .register-form {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;

    .form-field {
      display: flex;
      flex-direction: column;
      label {
        font-size: 1.6rem;
        color: ${({ theme }) => theme.colors.text};
        margin-bottom: 0.5rem;
      }
      input {
        width: 100%;
        padding: 1rem 1.5rem;
        font-size: 1.6rem;
        border: 1px solid ${({ theme }) => theme.colors.border};
        border-radius: 4px;
        color: ${({ theme }) => theme.colors.black};
        text-transform: none;
        box-shadow: ${({ theme }) => theme.colors.shadowSupport};
        &:focus {
          outline: none;
          border-color: ${({ theme }) => theme.colors.helper};
        }
      }
    }
  }
`;
import { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import { useCartContext } from "../context/CartContext";
import PageNavigation from "../components/PageNavigation";
import MyImage from "../components/MyImage";
import { Container } from "../styles/Container";
import FormatPrice from "../Helpers/FormatPrice";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import Star from "../components/Star";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";

import AddToCart from "../components/AddToCart";

const API = "https://dummyjson.com/products/";

const SingleProduct = () => {
  const { getSingleProduct, isSingleLoading, singleProduct } =
    useProductContext();

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    getSingleProduct(`${API}${id}`);
  }, []);

  const {
    title,
    description,
    category,
    price,
    rating,
    stock,
    brand,
    reviews,
    images,
  } = singleProduct;

  // console.log("single",singleProduct);

  // useEffect(() => {
  //   console.log(singleProduct); // Check if singleProduct is populated
  // }, [singleProduct]);

  if (isSingleLoading) {
    return (
      <Wrapper>
        <div className="page_loading">Loading.....</div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <PageNavigation title={title} />
      <Container className="container">
        <div className="grid grid-two-column">
          {/* product Images  */}
          <div className="product_images">
            <MyImage imgs={images} />
          </div>

          {/* product data  */}
          <div className="product-data">
            <h2>{title}</h2>
            <Star stars={rating} reviews={reviews ? reviews.length : 0} />

            <p className="product-data-price">
              MRP:
              <del>
                <FormatPrice price={price + 10} />
              </del>
            </p>
            <p className="product-data-price product-data-real-price">
              Deal of the Day: <FormatPrice price={price} />
            </p>
            <p>{description}</p>
            <div className="product-data-warranty">
              {category === "groceries" ? (
                <div className="product-warranty-data">
                  <MdOutlineLocalGroceryStore className="warranty-icon" />
                  <p>Shop Today</p>
                </div>
              ) : (
                <div className="product-warranty-data">
                  <TbReplace className="warranty-icon" />
                  <p>30 Days replacement</p>
                </div>
              )}
              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p>Free Delivery</p>
              </div>

              {category === "groceries" ? (
                <div className="product-warranty-data">
                  <FiShoppingBag className="warranty-icon" />
                  <p>Fresh Delivery</p>
                </div>
              ) : (
                <div className="product-warranty-data">
                  <MdSecurity className="warranty-icon" />
                  <p>2 Year Warranty </p>
                </div>
              )}
            </div>

            <div className="product-data-info">
              <p>
                Available:
                <span> {stock > 0 ? "In Stock" : "Not Available"}</span>
              </p>
              <p>
                ID : <span> {id} </span>
              </p>
              {category !== "groceries" && (
                <p>
                  Brand :<span> {brand} </span>
                </p>
              )}
            </div>
            <hr />
            {stock > 0 && <AddToCart product={singleProduct} />}
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
  }

  .product_images {
    display: flex;
    align-items: center;
  }

  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;

    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: bold;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      /* height: 0.2rem; */
      border: 0.1rem solid #000;
      color: red;
    }
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .page_loading {
    font-size: 3.2rem;
    height: 100vh; /*for full ht*/
    color: rgba(29, 29, 29, 0.8); /* Color for the loading text */
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    animation: blink 1s infinite; /* Optional animation */

    @keyframes blink {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
`;

export default SingleProduct;
const FormatPrice = ({ price }) => {
    return Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(price * 25);
  };
  
  export default FormatPrice;
import { useState } from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import CartAmountToggle from "./CartAmountToggle";
import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";
import { useCartContext } from "../context/CartContext";

const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext();

  const { id, stock } = product;

  const [amount, setAmount] = useState(1);

  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const setIncrease = () => {
    amount < stock ? setAmount(amount + 1) : setAmount(stock);
  };

  return (
    <Wrapper>

      {/* add to cart  */}
      <CartAmountToggle
        amount={amount}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />

      <NavLink to="/cart" onClick={() => addToCart(id, amount, product)}>
        <Button className="btn">Add To Cart</Button>
      </NavLink>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .colors p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  /* we can use it as a global one too  */
  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }
`;
export default AddToCart;
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useCartContext } from "../context/CartContext";

const CartAmountToggle = ({ amount, setIncrease, setDecrease }) => {
  return (
    <div className="cart-button">
      <div className="amount-toggle">
        <button onClick={() => setDecrease()}>
          <FaMinus />
        </button>
        <div className="amount-style">{amount}</div>
        <button onClick={() => setIncrease()}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default CartAmountToggle;

import React, { useState } from "react";
import FormatPrice from "../Helpers/FormatPrice";
import CartAmountToggle from "./CartAmountToggle";
import { FaTrash } from "react-icons/fa";
import { useCartContext } from "../context/CartContext";

const CartItem = ({ id, title, images, price, amount }) => {
  const { removeItem, setDecrease, setIncrement } = useCartContext();
  

  return (
    <div className="cart_heading grid grid-five-column">
      <div className="cart-image--name">
        <div>
          <figure>
            <img src={images} alt={id} />
          </figure>
        </div>
        <div>
          <p>{title}</p>
        </div>
      </div>
      {/* price   */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price} />
        </p>
      </div>
      {/* Quantity  */}
      <CartAmountToggle
        amount={amount}
        setDecrease={() => setDecrease(id)}
        setIncrease={() => setIncrement(id)}
      />
      {/* //Subtotal */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price * amount} />
        </p>
      </div>
      <div>
        <FaTrash className="remove_icon" onClick={() => removeItem(id)} />
      </div>
    </div>
  );
};

export default CartItem;
import { useProductContext } from "../context/ProductContext";
import styled from "styled-components";
import Product from "./Product";

const FeatureProduct = () => {
  const { isLoading, featureProducts } = useProductContext();

  if (isLoading) {
    return (
      <Wrapper>
        <div className="page_loading">Loading.....</div>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="section">
      <div className="container">
        <div className="intro-data">Check Now!</div>
        <div className="common-heading">Our Feature Services</div>
        <div className="grid grid-three-column">
          {featureProducts.map((curElem) => {
            return <Product key={curElem.id} {...curElem} />;
          })}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 9rem 0;
  background-color: ${({ theme }) => theme.colors.bg};

  .container {
    max-width: 120rem;
  }

  figure {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s linear;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.2s linear;
      cursor: pointer;
    }
    &:hover::after {
      width: 100%;
    }
    &:hover img {
      transform: scale(1.2);
    }
    img {
      max-width: 90%;
      margin-top: 1.5rem;
      height: 20rem;
      transition: all 0.2s linear;
    }

    .caption {
      position: absolute;
      top: 15%;
      right: 10%;
      text-transform: uppercase;
      background-color: ${({ theme }) => theme.colors.bg};
      color: ${({ theme }) => theme.colors.helper};
      padding: 0.8rem 2rem;
      font-size: 1.2rem;
      border-radius: 2rem;
    }
  }

  .card {
    background-color: #fff;
    border-radius: 1rem;

    .card-data {
      padding: 0 2rem;
    }

    .card-data-flex {
      margin: 2rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    h3 {
      color: ${({ theme }) => theme.colors.text};
      text-transform: capitalize;
    }

    .card-data--price {
      color: ${({ theme }) => theme.colors.helper};
    }

    .btn {
      margin: 2rem auto;
      background-color: rgb(0 0 0 / 0%);
      border: 0.1rem solid rgb(98 84 243);
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: rgb(98 84 243);
      }

      &:hover a {
        color: #fff;
      }
      a {
        color: rgb(98 84 243);
        font-size: 1.4rem;
      }
    }
       .page_loading {
    font-size: 3.2rem;
    height: 100vh; /*for full ht*/
    color: rgba(29, 29, 29, 0.8); /* Color for the loading text */
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    animation: blink 1s infinite; /* Optional animation */

    @keyframes blink {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }
  }
`;

export default FeatureProduct;

import styled from "styled-components";
import { useFilterContext } from "../context/FilterContext";
import { FaCheck } from "react-icons/fa";
import FormatPrice from "../Helpers/FormatPrice";
import { Button } from "../styles/Button";

const FilterSection = () => {
  const {
    filters: { text, category, brand, maxPrice, price, minPrice },
    updateFilterValue,
    all_products,
    clearFilters,
  } = useFilterContext();

  // get the unique values of each property
  const getUniqueData = (data, attr) => {
    let newVal = data.map((curElem) => {
      return curElem[attr];
    });

    if (attr === "colors") {
      // return (newVal = ["All", ...new Set([].concat(...newVal))]);
      newVal = newVal.flat();
    }

    return (newVal = ["all", ...new Set(newVal)]);
  };

  //   // we need to have the individual data of each in an array format
  const categoryData = getUniqueData(all_products, "category");
  const companyData = getUniqueData(all_products, "brand");
  //   const colorsData = getUniqueData(all_products, "colors");
  // console.log(
  //   "🚀 ~ file: FilterSection.js ~ line 23 ~ FilterSection ~ companyData",
  //   colorsData
  // );

  return (
    <Wrapper>
      <div className="filter-search">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            placeholder="Search"
            value={text}
            onChange={updateFilterValue}
          />
        </form>
      </div>

      <div className="filter-category">
        <h3>Category</h3>
        <div>
          {categoryData.map((curElem, index) => {
            return (
              <button
                key={index}
                type="button"
                name="category"
                value={curElem}
                className={curElem === category ? "active" : ""}
                onClick={updateFilterValue}
              >
                {curElem}
              </button>
            );
          })}
        </div>
      </div>

     {category!=="groceries" && ( <div className="filter-company">
        <h3>Brand</h3>

        <form action="#">
          <select
            name="brand"
            id="brand"
            className="filter-company--select"
            onClick={updateFilterValue}
          >
            {companyData.map((curElem, index) => {
              return (
                <option key={index} value={curElem} name="brand">
                  {curElem}
                </option>
              );
            })}
          </select>
        </form>
      </div>)}

      {/*  <div className="filter-colors colors">
        <h3>Colors</h3>

        <div className="filter-color-style">
          {colorsData.map((curColor, index) => {
            if (curColor === "all") {
              return (
                <button
                  key={index}
                  type="button"
                  value={curColor}
                  name="color"
                  className="color-all--style"
                  onClick={updateFilterValue}>
                  all
                </button>
              );
            }
            return (
              <button
                key={index}
                type="button"
                value={curColor}
                name="color"
                style={{ backgroundColor: curColor }}
                className={color === curColor ? "btnStyle active" : "btnStyle"}
                onClick={updateFilterValue}>
                {color === curColor ? <FaCheck className="checkStyle" /> : null}
              </button>
            );
          })}
        </div>
      </div>*/}

      <div className="filter_price">
        <h3>Price</h3>
        <p>
          <FormatPrice price={price} />
        </p>
        <input
          type="range"
          name="price"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={updateFilterValue}
        />
      </div>

      <div className="filter-clear">
        <Button className="btn" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div> 
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }

  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }

  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }

  .filter-color-style {
    display: flex;
    justify-content: center;
  }

  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;

export default FilterSection;
import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";
import { FaDiscord, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <Wrapper>
        <section className="contact-short">
          <div className="grid grid-two-column">
            <div>
              <h3>Ready to get started?</h3>
              <h3>Talk to us today</h3>
            </div>

            <div>
              <Button className="btn hireme-btn">
                <NavLink to="/"> Get Started </NavLink>
              </Button>
            </div>
          </div>
        </section>
        {/* footer section */}

        <footer>
          <div className="container grid grid-four-column">
            <div className="footer-about">
              <h3>Himanshu Bisht</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. </p>
            </div>
            <div className="footer-subscribe">
              <h3>Subscribe to get important updates</h3>
              <form action="#">
                <input type="email" name="email" placeholder="YOUR E-MAIL" />

                <input type="submit" value="subscribe" />
              </form>
            </div>
            <div className="footer-social">
              <h3>Follow Us</h3>
              <div className="footer-social--icons">
                <div>
                  <FaDiscord className="icons" />
                </div>
                <div>
                  <FaInstagram className="icons" />
                </div>
                <div>
                  <a
                    href="#"
                    target="_blank">
                    <FaYoutube className="icons" />
                  </a>
                </div>
              </div>
            </div>
            <div className="footer-contact">
              <h3>Call Us</h3>
              <h3>
                <a href="tel:8287753492">8287753492</a>
              </h3>
            </div>
          </div>

          <div className="footer-bottom--section">
            <hr />
            <div className="container grid grid-two-column ">
              <p>
                @{new Date().getFullYear()} HimanshuBisht. All Rights Reserved
              </p>
              <div>
                <p>PRIVACY POLICY</p>
                <p>TERMS & CONDITIONS</p>
              </div>
            </div>
          </div>
        </footer>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  .iSIFGq {
    margin: 0;
  }

  .contact-short {
    max-width: 60vw;
    margin: auto;
    padding: 5rem 10rem;
    background-color: ${({ theme }) => theme.colors.bg};
    border-radius: 1rem;
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    transform: translateY(50%);

    .grid div:last-child {
      justify-self: end;
      align-self: center;
    }
  }

  footer {
    padding: 14rem 0 9rem 0;
    background-color: ${({ theme }) => theme.colors.footer_bg};
    h3 {
      color: ${({ theme }) => theme.colors.hr};
      margin-bottom: 2.4rem;
    }
    p {
      color: ${({ theme }) => theme.colors.white};
    }
    .footer-social--icons {
      display: flex;
      gap: 2rem;

      div {
        padding: 1rem;
        border-radius: 50%;
        border: 2px solid ${({ theme }) => theme.colors.white};

        .icons {
          color: ${({ theme }) => theme.colors.white};
          font-size: 2.4rem;
          position: relative;
          cursor: pointer;
        }
      }
    }
  }

  .footer-bottom--section {
    padding-top: 9rem;

    hr {
      margin-bottom: 2rem;
      color: ${({ theme }) => theme.colors.hr};
      height: 0.1px;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .contact-short {
      max-width: 80vw;
      margin: 4.8rem auto;
      transform: translateY(0%);
      text-align: center;

      .grid div:last-child {
        justify-self: center;
      }
    }

    footer {
      padding: 9rem 0 9rem 0;
    }

    .footer-bottom--section {
      padding-top: 4.8rem;
    }
  }
`;

export default Footer;
import React from "react";
import styled from "styled-components";
import Product from "./Product";

const GridView = ({ products }) => {
  return (
    <Wrapper className="section">
      <div className="container grid grid-three-column">
        {products.map((curElem) => {
          return <Product key={curElem.id} {...curElem} />;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 9rem 0;

  .container {
    max-width: 120rem;
  }

  .grid {
    gap: 3.2rem;
  }

  figure {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s linear;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.2s linear;
      cursor: pointer;
    }
    &:hover::after {
      width: 100%;
    }
    &:hover img {
      transform: scale(1.2);
    }
    img {
      max-width: 90%;
      margin-top: 1.5rem;
      height: 20rem;
      transition: all 0.2s linear;
    }
  }

  .card {
    background-color: ${({ theme }) => theme.colors.bg};
    border-radius: 1rem;

    .card-data {
      padding: 0 1rem;
    }

    .card-data-flex {
      margin: 2rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-data--price {
      color: ${({ theme }) => theme.colors.helper};
    }

    h3 {
      color: ${({ theme }) => theme.colors.text};
      text-transform: capitalize;
    }

    .btn {
      margin: 2rem auto;
      background-color: rgb(0 0 0 / 0%);
      border: 0.1rem solid rgb(98 84 243);
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: rgb(98 84 243);
      }

      &:hover a {
        color: #fff;
      }
      a {
        color: rgb(98 84 243);
        font-size: 1.4rem;
      }
    }
  }
`;

export default GridView;
import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Nav from "./Nav";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { Button } from "../styles/Button";

const Header = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  return (
    <MainHeader>
      <NavLink to="/">
        <img
          className="logo"
          src="../../public/images/Quick.png"
          alt="my logo"
        />
      </NavLink>
      {user ? (
        <Nav />
      ) : (
        <Link to="/login">
          <Button className="btn">Login</Button>
        </Link>
      )}
    </MainHeader>
  );
};

const MainHeader = styled.header`
  padding: 0 4.8rem;
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .logo {
    height: 5rem;
  }
  .btn {
    font-size: 1.4rem;
    padding: 0.8rem 1.4rem;
  }
`;

export default Header;