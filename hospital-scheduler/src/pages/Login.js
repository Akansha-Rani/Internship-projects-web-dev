// pages/Login.js
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LoginWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.secondary};
`;

const LoginBox = styled.form`
  background: ${({ theme }) => theme.colors.white};
  padding: 2.5rem 3rem;
  border-radius: 10px;
  box-shadow: 0 2px 16px #c1e2c6;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 350px;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: 5px;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 0.8rem;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`;

export default function Login({ setAuth }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    // Replace with real auth
    if (form.username === "admin" && form.password === "admin") {
      setAuth(true);
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <LoginWrapper>
      <LoginBox onSubmit={handleSubmit}>
        <h2 style={{ color: "#298D53", textAlign: "center" }}>Hospital Login</h2>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button type="submit">Sign In</Button>
      </LoginBox>
    </LoginWrapper>
  );
}
