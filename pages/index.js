// pages/index.js
import UserSelector from '../components/UserSelector';

const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Robert Johnson' },
  { id: 4, name: 'Emily Davis' },
  { id: 5, name: 'Michael Brown' },
  { id: 6, name: 'Olivia Miller' },
  { id: 7, name: 'William Wilson' },
  { id: 8, name: 'Sophia Taylor' },
  // Add more users as needed
];

const HomePage = () => {
  const handleUserSelect = (selectedUsers) => {
    console.log('Selected Users:', selectedUsers);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">User Selector Example</h1>
        <UserSelector users={users} onSelect={handleUserSelect} />
      </div>
    </div>
  );
};

export default HomePage;
