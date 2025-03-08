import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Nav from "./Nav";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { Button } from "../styles/Button";

// Key Features of the <header> Tag
// Semantic Meaning:

// The <header> tag provides semantic meaning to the content it wraps, indicating that the content within is related to the heading of that section.
// It helps search engines and screen readers understand the structure of the document better.
// Content Typically Included:

// Headings: Usually includes one or more heading elements (<h1>, <h2>, etc.).
// Navigation: Often contains navigation links (<nav> elements) for the main sections of the site.
// Logos or Branding: Can include logos or brand names, often as images or text.
// Introductory Content: May include a brief introduction or description of the content that follows.
// Usage:

// The <header> element can be used within the <body> tag to define a top-level header for the entire page or within other sections (<article>, <section>, etc.) to create headers for those specific areas.
// There can be multiple <header> tags on a single page if used within different sections.

// Benefits of Using the <header> Tag
// Accessibility: Helps improve accessibility for users who rely on screen readers, as it clearly identifies header sections.
// SEO: Provides better structure for search engines to understand the organization of the page.
// Styling: Allows for easier styling of header content in CSS by targeting the <header> tag specifically.

// The <header> element is a block-level element in HTML.

const Header = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  return (
    <MainHeader>
      <NavLink to="/">
        <img
          className="MainHeader__logo"
          src="../../public/images/Quick.png"
          alt="my logo"
        />
      </NavLink>
      {user ? (
        <Nav />
      ) : (
        <Link to="/login">
          <Button className="MainHeader__btn">Login</Button>
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

  /* Layering: */
  /* If you have overlapping elements (like a dropdown menu that appears when you click a button), having the header as position: relative; ensures that those dropdowns or popups are positioned correctly in relation to the header, not somewhere else on the page. */

  .MainHeader__logo {
    height: 5rem;
  }
  .MainHeader__btn {
    font-size: 1.4rem;
    padding: 0.8rem 1.4rem;
  }
`;

export default Header;
