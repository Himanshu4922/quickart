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

/* This property only applies to Firefox, and it can control the width of the scrollbar in that browser. */
/* When set to thin, it can potentially affect the appearance or rendering of scrollbars in Firefox, but it doesn't impact Chrome. */
body {
  scrollbar-color: rgb(98 84 243);
  overflow-x: hidden;
  /* scrollbar-width: thin; */
}

/* In Chrome (and other WebKit-based browsers), scrollbar styles are controlled by the ::-webkit-scrollbar pseudo-elements. When you define styles for these pseudo-elements, they directly control the scrollbar's appearance in Chrome. */
body::-webkit-scrollbar {
  width: 1.5rem ;
}

body::-webkit-scrollbar-track {
   background-color: rgb(24 24 29);
}

/* When you set background-clip to content-box, the background is only visible in the content area of the element, excluding padding and border areas.
This means that if you have padding or borders, the background color or image will not extend into those areas. Instead, it will only cover the content area. */
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

/* When set to normal, the browser will collapse consecutive whitespace characters (like spaces and tabs) into a single space.
Line breaks (like newlines or returns) are respected, which means that the content can wrap onto the next line if it exceeds the width of its container. */
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
  line-height: 1.5; /* Line height relative to the font size */
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
      /* When you apply text-transform: capitalize; to an element, it changes the first letter of each word in that element's text to uppercase. All other letters remain in their original case. */
    }

     .intro-data {
      margin-bottom: 0;
      text-transform: uppercase;
      /* When you apply text-transform: uppercase; to an element, it transforms all the text within that element to uppercase letters, regardless of how it was originally typed. */
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
