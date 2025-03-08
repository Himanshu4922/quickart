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
