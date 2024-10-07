import React, { useState } from 'react';
import Search from './components/Search/Search';
import Users from './components/User/Users';
import Repositories from './components/Repository/Repositories';
import Issues from './components/Issue/Issues';
import CreateIssueModal from './components/Modal/CreateIssueModal';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRepo, setSelectedRepo] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleSearchResults = (results) => {
    setUsers(results);
    setSelectedUser(null); // Reset selected user
    setSelectedRepo({}); // Reset selected repository
  };

  return (
    <div>
      <Search onResults={handleSearchResults} />
      <Users users={users} onSelectUser={setSelectedUser} />
      {selectedUser && <Repositories username={selectedUser} onSelectRepo={setSelectedRepo} />}
      {selectedRepo && selectedRepo.name && (
        <div>
          <h3>Selected Repository: {selectedRepo.name}</h3>
          <Issues owner={selectedUser} id={selectedRepo.id} repo={selectedRepo.name} onOpenModal={() => setShowModal(true)} />
        </div>
      )}
      {showModal && <CreateIssueModal repositoryId={selectedRepo.id} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default App;