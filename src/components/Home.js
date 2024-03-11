import React from 'react';
import styled from 'styled-components';

const StyledBanner = styled.div`
  height: 300px;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledDescription = styled.div`
  margin-top: 20px;
`;

const Home = () => {
  return (
    <div>
      <StyledBanner>
        <img src="banner.jpg" alt="Banner" />
      </StyledBanner>
      <StyledDescription>
        <h2>Welcome to Our Application</h2>
        <p>
          This is a description of our application and its features. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Sed euismod, nisl nec tincidunt lacinia, nisl nisl aliquet
          nisl, eget euismod nisl nisl eget nisl.
        </p>
      </StyledDescription>
    </div>
  );
};

export default Home;