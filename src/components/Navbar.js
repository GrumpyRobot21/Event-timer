import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from './AuthContext';

const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f0f0f0;
  border-bottom: 2px solid #000;
  font-family: 'Ojuju', sans-serif;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 900;
  color: #000;
  text-decoration: none;
  border: 2px solid #000;
  border-radius: 50%;
  padding: 0.5rem 1rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-right: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  color: #000;
  text-decoration: none;
  font-weight: bold;
  
  &:hover {
    color: #007bff;
  }
`;

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <NavbarWrapper>
      <Logo to="/">Event-Timer!</Logo>
      <NavLinks>
        {user ? (
          <>
            <NavLink to="/events">Event List</NavLink>
            <NavLink to="/create-event">Create Event</NavLink>
            <NavLink to="/event-tracker">Event Tracker</NavLink>
            <NavLink to="/" onClick={logout}>
              Sign Out
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">Sign In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        )}
      </NavLinks>
    </NavbarWrapper>
  );
};

export default Navbar;