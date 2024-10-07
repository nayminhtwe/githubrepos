import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_ISSUE = gql`
  mutation CreateIssue($repositoryId: ID!, $title: String!, $body: String!) {
    createIssue(input: { repositoryId: $repositoryId, title: $title, body: $body }) {
      issue {
        id
        title
      }
    }
  }
`;

const CreateIssueModal = ({ repositoryId, onClose }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [createIssue] = useMutation(CREATE_ISSUE);

  const handleSubmit = async () => {
    await createIssue({ variables: { repositoryId, title, body } });
    onClose();
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const modalStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '400px',
    maxWidth: '90%',
  };

  const inputStyle = {
    width: '95%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  };

  const textareaStyle = {
    width: '95%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  };

  const modalButtonsStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s, transform 0.2s',
  };

  const closeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6c757d',
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <h2>Create New Issue</h2>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Title" 
          style={inputStyle}
        />
        <textarea 
          value={body} 
          onChange={(e) => setBody(e.target.value)} 
          placeholder="Body" 
          style={textareaStyle}
        />
        <div style={modalButtonsStyle}>
          <button style={buttonStyle} onClick={handleSubmit}>Submit</button>
          <button style={closeButtonStyle} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CreateIssueModal;