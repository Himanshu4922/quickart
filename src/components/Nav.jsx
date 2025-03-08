import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import { CgMenu, CgClose } from "react-icons/cg";
import { useCartContext } from "../context/CartContext";
import { Button } from "./../styles/Button";
import { useAuth } from "../utils/AuthContext";

const Nav = () => {
  const [menuIcon, setMenuIcon] = useState();
  const { total_item } = useCartContext();
  const { logoutUser } = useAuth();

  // BEM Structure
  // Block: The outermost parent element (e.g., a component or a distinct section of a page).
  // Element: A component that is a part of a block and has no standalone meaning. It is semantically tied to the block.
  // Modifier: A flag that changes the appearance or behavior of a block or element.
  // BEM Naming Convention
  // Block: block-name
  // Element: block-name__element-name
  // Modifier: block-name--modifier-name or block-name__element-name--modifier-name

  //   Purpose of NavLink
  // Navigation in Single Page Applications (SPAs):

  // In SPAs, content is dynamically loaded without refreshing the entire page. NavLink helps in navigating between different views or components without a full page reload, providing a smooth user experience.
  // Active Link Styles:

  // One of the key features of NavLink is that it automatically applies an active class (usually "active") to the link when the route it points to is currently active. This allows developers to easily style the active link differently, making it clear to users which page they are on.

  {
    /* <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
  About
</NavLink> */
  }
  return (
    <StyledNav>
      <div className={menuIcon ? "navbar active" : "navbar"}>
        <ul className="navbar-lists">
          <li>
            <NavLink
              to="/"
              className="navbar-link "
              onClick={() => setMenuIcon(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="navbar-link "
              onClick={() => setMenuIcon(false)}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className="navbar-link "
              onClick={() => setMenuIcon(false)}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="navbar-link "
              onClick={() => setMenuIcon(false)}
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className="navbar-link cart-trolley--link"
              onClick={() => setMenuIcon(false)}
            >
              <FiShoppingCart className="cart-trolley" />
              <span className="cart-total--item"> {total_item} </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="navbar-link">
              <Button onClick={logoutUser} className="user-logout">
                Logout
              </Button>
            </NavLink>
          </li>
        </ul>

        {/* two button for open and close of menu */}
        <div className="mobile-navbar-btn">
          <CgMenu
            name="menu-outline"
            className="mobile-nav-icon"
            onClick={() => setMenuIcon(true)}
          />
          <CgClose
            name="close-outline"
            className="mobile-nav-icon close-outline"
            onClick={() => setMenuIcon(false)}
          />
        </div>
      </div>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  .navbar-lists {
    display: flex;
    gap: 4.8rem;
    align-items: center;

    /* You can nest selectors inside your styled component, similar to how you would in SCSS: */

    .navbar-link {
      /* The & operator is a placeholder that represents the parent selector. It allows you to define styles that apply to the current selector in a more structured way, especially in nested contexts. Here's how it's used in your code:

&:link, &:visited:

The & refers to the .navbar-link class itself. So, &:link translates to .navbar-link:link, which targets the link state of the .navbar-link element.
Similarly, &:visited targets the visited state of the same links.
This structure is useful for applying styles conditionally based on link states (normal and visited). */
      &:link,
      &:visited {
        display: inline-block;
        text-decoration: none;
        font-size: 1.8rem;
        font-weight: 500;
        text-transform: uppercase;
        color: ${({ theme }) => theme.colors.black};
        transition: color 0.3s linear;
      }

      &:hover,
      &:active {
        color: ${({ theme }) => theme.colors.helper};
      }
    }
  }

  .mobile-navbar-btn {
    display: none;
    background-color: transparent;
    cursor: pointer;
    border: none;
  }
  /* The CSS selector .mobile-nav-icon[name="close-outline"] is a combined class and attribute selector. */
  .mobile-nav-icon[name="close-outline"] {
    display: none;
  }

  .close-outline {
    display: none;
  }

  .cart-trolley--link {
    position: relative;

    .cart-trolley {
      position: relative;
      font-size: 3.2rem;
    }
    /* Why Use Nested CSS?
Nesting is useful here because:

Readability: It helps you see the relationship between the .cart-trolley--link and .cart-trolley elements, making the CSS more readable.
Scoping: It ensures that styles for .cart-trolley only apply when it’s inside .cart-trolley--link. This avoids accidental styling of unrelated .cart-trolley elements elsewhere in the code.
Organization: It visually organizes your CSS, especially in complex components where elements are deeply related. */

    .cart-total--item {
      /* When you set the display property of an inline element to grid or flex, it changes how the element behaves in the layout.
      Block-Level Behavior: When you set display: grid or display: flex, the element behaves more like a block-level element. It occupies the full width available (unless a specific width is set) and can contain other block or inline elements. */
      width: 2.4rem;
      height: 2.4rem;
      position: absolute;
      /* background-color: #000; */
      color: #000;
      border-radius: 50%;
      display: grid;
      place-items: center;
      top: -20%;
      left: 70%;
      background-color: ${({ theme }) => theme.colors.helper};
    }
  }

  .user-login--name {
    text-transform: capitalize;
  }

  .user-logout,
  .user-login {
    font-size: 1.4rem;
    padding: 0.8rem 1.4rem;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* 
An inline-block element is a type of display behavior in CSS that combines features of both inline and block elements:

Inline Characteristics:

It does not start on a new line; multiple inline-block elements can sit next to each other, horizontally, on the same line.
It respects surrounding content and does not break the flow of text.
Block Characteristics:

You can set both width and height properties on it, which isn’t possible with pure inline elements.
It respects padding, margin, and borders, just like a block-level element. */
    .mobile-navbar-btn {
      display: inline-block;
      z-index: 9999;
      border: ${({ theme }) => theme.colors.black};

      .mobile-nav-icon {
        font-size: 4.2rem;
        color: ${({ theme }) => theme.colors.black};
      }
    }

    .active .mobile-nav-icon {
      display: none;
      font-size: 4.2rem;
      position: absolute;
      top: 30%;
      right: 10%;
      color: ${({ theme }) => theme.colors.black};
      z-index: 9999;
    }

    .active .close-outline {
      display: inline-block;
    }

    .navbar-lists {
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #fff;

      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      visibility: hidden;
      opacity: 0;
      transform: translateX(100%);
      /* transform-origin: top; */
      transition: all 1s linear;
    }

    .active .navbar-lists {
      visibility: visible; /* Make the element visible */
      opacity: 1;
      transform: translateX(0); /* Move it back into view */
      z-index: 999;
      transform-origin: right; /* Sets the point from which the transform occurs */
      transition: all 1s linear;

      .navbar-link {
        /* font-size: 4.2rem; */
      }
    }
    .cart-trolley--link {
      position: relative;

      .cart-trolley {
        position: relative;
        font-size: 5.2rem;
      }

      .cart-total--item {
        width: 4.2rem;
        height: 4.2rem;
        font-size: 2rem;
      }
    }

    .user-logout,
    .user-login {
      font-size: 2.2rem;
      padding: 0.8rem 1.4rem;
    }
  }
`;

export default Nav;
