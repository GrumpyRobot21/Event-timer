import React from 'react';
import styled from 'styled-components';
import clockImage from '../assets/clock.jpeg';

const MainPage = styled.div`
  background-color: #fff;
  min-height: calc(100vh - 80px);
  padding-bottom: 80px;
  font-family: 'Ojuju', sans-serif;
  display: flex;
  flex-direction: column;
`;

const StyledBanner = styled.div`
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const StyledHeader = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const StyledDescription = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  flex-grow: 1;

  p {
    font-size: 1.2rem;
    line-height: 1.5;
  }
`;

const Home = () => {
  return (
    <MainPage>
      <StyledBanner>
        <img src={clockImage} alt="Banner" />
      </StyledBanner>
      <StyledHeader>Welcome to Our Application</StyledHeader>
      <StyledDescription>
        <p>
          This is a description of our application and its features. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Sed euismod, nisl nec tincidunt lacinia, nisl nisl aliquet
          nisl, eget euismod nisl nisl eget nisl.
        </p>
      </StyledDescription>
    </MainPage>
  );
};

export default Home;