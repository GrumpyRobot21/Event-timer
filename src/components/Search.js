import React, { useState } from 'react';
import styled from 'styled-components';

const StyledSearch = styled.div`
  margin-bottom: 20px;
`;

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <StyledSearch>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search events..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </StyledSearch>
  );
};

export default Search;