import React from 'react';
import styled from 'styled-components';

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StyledPageLink = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  background-color: ${(props) => (props.active === "true" ? '#007bff' : 'transparent')};
  color: ${(props) => (props.active === "true" ? '#fff' : '#007bff')};
  cursor: pointer;
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageLinks = [];

  for (let i = 1; i <= totalPages; i++) {
    pageLinks.push(
      <StyledPageLink
        key={i}
        active={i === currentPage ? "true" : "false"} // Convert boolean to string
        onClick={() => onPageChange(i)}
      >
        {i}
      </StyledPageLink>
    );
  }

  return <StyledPagination>{pageLinks}</StyledPagination>;
};

export default Pagination;
