import React from 'react';
import './style.css';

const Users = ({ users, onSelectUser }) => {
  return (
    <div className="users-container">
      <h3>Users</h3>
      <div className="user-list">
        {users.map(user => (
          <div key={user.id} className="user-card" onClick={() => onSelectUser(user.login)}>
            <img src={user.avatarUrl} alt={`${user.login}'s avatar`} width="50" height="50" />
            <div className="user-login">{user.login}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;