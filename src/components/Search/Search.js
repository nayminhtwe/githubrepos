import React, { useState, useEffect } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import './style.css';

const SEARCH_USERS = gql`
  query SearchUsers($query: String!) {
    search(query: $query, type: USER, first: 30) {
      edges {
        node {
          ... on User {
            id
            login
            avatarUrl
          }
        }
      }
    }
  }
`;

const Search = ({ onResults }) => {
  const [query, setQuery] = useState('');
  const [searchUsers, { data }] = useLazyQuery(SEARCH_USERS);

  const handleSearch = () => {
    searchUsers({ variables: { query } });
  };

  useEffect(() => {
    if (data) {
      onResults(data.search.edges.map(edge => edge.node));
    }
  }, [data]);

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search GitHub Users"
      />
      <button onClick={handleSearch} className="search-button">Search</button>
    </div>
  );
};

export default Search;