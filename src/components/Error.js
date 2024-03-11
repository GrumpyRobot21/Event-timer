import React from 'react';
import styled from 'styled-components';

const StyledError = styled.div`
  color: red;
  font-size: 18px;
  margin-bottom: 10px;
`;

const Error = ({ message }) => {
  return <StyledError>{message}</StyledError>;
};

export default Error;