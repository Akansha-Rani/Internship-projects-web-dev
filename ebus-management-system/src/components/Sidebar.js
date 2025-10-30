import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const SideNav = styled.nav`
  width: 240px;
  min-height: 100vh;
  background: linear-gradient(135deg,#667eea 0%,#764ba2 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 12px rgba(102,126,234,0.1);
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 2rem 0 1.5rem 0;
  letter-spacing: 2px;
`;

const StyledLink = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  font-size: 1.15rem;
  padding: 1rem;
  margin: 0.5rem 1rem;
  border-radius: 12px;
  &.active, &:hover {
    background: rgba(255,255,255,0.13);
    font-weight: bold;
    box-shadow: 0 2px 10px rgba(102,126,234,0.15);
  }
`;

const Sidebar = () => {
  return (
    <SideNav>
      <Logo>eBus</Logo>
      <StyledLink to="/">Dashboard</StyledLink>
      <StyledLink to="/map">Live Map</StyledLink>
      <StyledLink to="/admin">Admin Panel</StyledLink>
    </SideNav>
  );
};

export default Sidebar;
