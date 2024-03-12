import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: #000;
  padding: 1rem;
  text-align: center;
  color: #fff;
  font-family: 'Ojuju', sans-serif;
`;

const StyledSocialLink = styled.a`
  margin: 0 10px;
  color: #fff;
  text-decoration: none;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <p>&copy; 2024 Event-Timer. All rights reserved.</p>
      <div>
        <StyledSocialLink
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </StyledSocialLink>
        <StyledSocialLink
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </StyledSocialLink>
        <StyledSocialLink
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </StyledSocialLink>
      </div>
    </StyledFooter>
  );
};

export default Footer;