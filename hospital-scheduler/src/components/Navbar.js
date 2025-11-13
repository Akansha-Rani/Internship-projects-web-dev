import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background: ${({ theme }) => theme.colors.primary};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Links = styled.div`
  display: flex;
  gap: 2rem;
`;

const StyledLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.white};
  font-weight: 500;
  text-decoration: none;
  &.active {
    border-bottom: 2px solid ${({ theme }) => theme.colors.accent};
  }
`;

export default function Navbar() {
  return (
    <Nav>
      <h2 style={{ color: "#fff" }}>Hospital Scheduler</h2>
      <Links>
        <StyledLink to="/" end>Dashboard</StyledLink>
        <StyledLink to="/operations">Schedule</StyledLink>
        <StyledLink to="/doctors">Doctors</StyledLink>
        <StyledLink to="/patients">Patients</StyledLink>
        <StyledLink to="/history">History</StyledLink>
      </Links>
    </Nav>
  );
}
