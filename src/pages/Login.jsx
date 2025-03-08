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
