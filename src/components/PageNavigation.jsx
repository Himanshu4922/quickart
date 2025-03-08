import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const PageNavigation = ({ title }) => {
  return (
    <Wrapper>
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Home
      </NavLink>
      <Separator>/</Separator>
      <Title>{title}</Title>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 3.2rem;
  padding-left: 1.2rem;

  a {
    font-size: 3.2rem;
    color: ${({ theme }) => theme.colors.helper}; // Example color from theme
    text-decoration: none; // Remove underline
    transition: color 0.3s ease; // Smooth transition for color change

    &:hover {
      color: ${({ theme }) => theme.colors.btn}; // Change color on hover
    }

    &.active {
      font-weight: bold; // Make active link bold
    }
  }
`;

const Separator = styled.span`
  margin: 0 1rem; // Spacing around separator
  font-weight: normal; // Make the separator text normal weight
`;

const Title = styled.span`
  overflow: hidden; // Hide overflow
  white-space: nowrap; // Prevent wrapping to a new line
  text-overflow: ellipsis; // Show ellipsis (...) for overflow text
  max-width: 50rem; // Set a maximum width for the title
  display: inline-block; // Make the span behave like a block for ellipsis to work
`;

export default PageNavigation;
