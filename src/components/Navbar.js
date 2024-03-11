import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from './AuthContext';

const StyledNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f8f9fa;
`;

const StyledNavLink = styled(Link)`
  margin-left: 1rem;
  color: #333;
  text-decoration: none;
`;

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <StyledNavbar>
      <div>
        <Link to="/">Logo</Link>
      </div>
      <div>
        {user ? (
          <>
            <StyledNavLink to="/events">Event List</StyledNavLink>
            <StyledNavLink to="/create-event">Create Event</StyledNavLink>
            <StyledNavLink to="/event-tracker">Event Tracker</StyledNavLink>
            <StyledNavLink to="/" onClick={logout}>
              Sign Out
            </StyledNavLink>
          </>
        ) : (
          <>
            <StyledNavLink to="/login">Sign In</StyledNavLink>
            <StyledNavLink to="/signup">Sign Up</StyledNavLink>
          </>
        )}
      </div>
    </StyledNavbar>
  );
};

export default Navbar;