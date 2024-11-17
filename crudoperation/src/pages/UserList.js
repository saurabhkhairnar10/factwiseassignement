import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material'; // Importing MUI components
import SearchIcon from '@mui/icons-material/Search'; // Importing the MUI search icon
import UserCard from '../component/UserCard';
import celebritiesData from '../celebraties.json';
import '../css/UserList.css';

const UserList = () => {
  const [users, setUsers] = useState(celebritiesData);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user => {
    const fullName = `${user.first} ${user.last}`.toLowerCase().trim();
    return fullName.includes(searchQuery.toLowerCase().trim());
  });

  const handleEdit = (editedUser) => {
    setUsers(users.map(user =>
      user.id === editedUser.id ? editedUser : user
    ));
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div className="user-list-container">
      <h1 className="user-list-heading">FactWise Assessment Visual Reference</h1>

      {/* Search Box using Material-UI */}
      <div className="search-box-container">
        <TextField
          type="text"
          placeholder="Search user"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon /> {/* Material-UI Search Icon */}
              </InputAdornment>
            ),
          }}
        />
      </div>

      {/* List of filtered users */}
      <div className="user-card-container">
        {filteredUsers.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;
