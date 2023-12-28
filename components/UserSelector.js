import { useState } from 'react';

const UserSelector = ({ users, onSelect }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState('');

  const handleUserClick = (userId) => {
    const isSelected = selectedUsers.includes(userId);

    if (isSelected) {
      setSelectedUsers((prev) => prev.filter((id) => id !== userId));
    } else {
      setSelectedUsers((prev) => [...prev, userId]);
    }
  };

  const handleSelectClick = () => {
    onSelect(selectedUsers);
    setNotification('Users Selected!');
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <h1 className="text-black text-2xl">Search For Users</h1>
      <br />
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md text-black"
      />

      <ul className="mt-2 space-y-2">
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            onClick={() => handleUserClick(user.id)}
            className={`flex items-center p-2 cursor-pointer ${
              selectedUsers.includes(user.id)
                ? 'bg-blue-500 text-white'
                : 'bg-white text-black'
            }`}
          >
            <span className={selectedUsers.includes(user.id) ? 'font-bold' : ''}>
              {user.name}
            </span>
            {selectedUsers.includes(user.id) && <span className="ml-auto">&#10003;</span>}
          </li>
        ))}
      </ul>

      <button
        onClick={handleSelectClick}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Select
      </button>

      {notification && <p className="mt-2 text-green-500">{notification}</p>}
    </div>
  );
};

export default UserSelector;
