import React from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 80px);
  padding: 2rem;
  font-family: 'Ojuju', sans-serif;
`;

const LoginPage = () => {
  return (
    <PageContainer>
      <LoginForm />
    </PageContainer>
  );
};

export default LoginPage;