import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: #f8f9fa;
  padding: 20px;
  text-align: center;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <p>&copy; 2023 Your Company. All rights reserved.</p>
    </StyledFooter>
  );
};

export default Footer;