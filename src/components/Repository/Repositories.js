import React from 'react';
import { useQuery, gql } from '@apollo/client';
import './style.css';

const GET_REPOSITORIES = gql`
  query GetRepositories($username: String!, $cursor: String) {
    user(login: $username) {
      repositories(first: 10, after: $cursor) {
        totalCount
        edges {
          node {
            id
            name
            stargazerCount
            watchers {
              totalCount
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

const Repositories = ({ username, onSelectRepo }) => {
  const { data, fetchMore } = useQuery(GET_REPOSITORIES, {
    variables: { username },
  });

  const loadMore = () => {
    fetchMore({
      variables: {
        cursor: data.user.repositories.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.user.repositories.edges;
        const pageInfo = fetchMoreResult.user.repositories.pageInfo;

        return newEdges.length
          ? {
            user: {
              ...previousResult.user,
              repositories: {
                ...previousResult.user.repositories,
                edges: [...previousResult.user.repositories.edges, ...newEdges],
                pageInfo,
              },
            },
          }
          : previousResult;
      },
    });
  };

  if (!data) return null;

  return (
    <div>
      <h3>Total Repositories: {data.user.repositories.totalCount}</h3>
      <div className="repositories-container">
        {data.user.repositories.edges.map(({ node }) => (
          <div key={node.id} className="repository-card" onClick={() => onSelectRepo(node)}>
            <div className="repository-name">{node.name}</div>
            <div className="repository-stats">
              <span>⭐ {node.stargazerCount}</span>
              <span>👁️ {node.watchers.totalCount}</span>
            </div>
          </div>
        ))}
      </div>
      {data.user.repositories.pageInfo.hasNextPage && (
        <div className="load-more-container">
          <button className="load-more-button" onClick={loadMore}>Load More</button>
        </div>
      )}
    </div>
  );
};

export default Repositories;