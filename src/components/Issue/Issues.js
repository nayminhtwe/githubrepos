import React from 'react';
import { useQuery, gql } from '@apollo/client';
import './style.css';

const GET_ISSUES = gql`
  query GetIssues($owner: String!, $repo: String!) {
    repository(owner: $owner, name: $repo) {
      issues(first: 10, states: OPEN) {
        edges {
          node {
            id
            title
            createdAt
            author {
              login
            }
          }
        }
      }
    }
  }
`;

const Issues = ({ owner, repo, onOpenModal }) => {
  const { data } = useQuery(GET_ISSUES, {
    variables: { owner, repo },
  });

  if (!data) return null;

  const calculateTimeAgo = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffTime = Math.abs(now - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days ago`;
  };

  return (
    <div className="issues-container">
      <div className="issues-header">
        <h3>Open Issues</h3>
        <button className="create-issue-button" onClick={onOpenModal}>Create New Issue</button>
      </div>
      <ul>
        {data.repository.issues.edges.map(({ node }) => (
          <li key={node.id} className="issue-item">
            <span className="issue-title">{node.title}</span>
            <span className="issue-meta">{calculateTimeAgo(node.createdAt)} by {node.author.login}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Issues;