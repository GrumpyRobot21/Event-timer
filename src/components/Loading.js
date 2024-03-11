import React from 'react';
import styled from 'styled-components';

const StyledLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
`;

const Loading = () => {
  return <StyledLoading>Loading...</StyledLoading>;
};

export default Loading;