// pages/index.js
import { useState } from 'react';
import UserSelector from '../components/UserSelector';
import Calendar from '../components/Calender.js'; // Import the Calendar component

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
  const [isCalendarVisible, setCalendarVisible] = useState(false); // Add state for calendar visibility

  const handleUserSelect = (selectedUsers) => {
    console.log('Selected Users:', selectedUsers);
  };

  const handleCalendarClick = () => {
    setCalendarVisible(true);
  };

  const handleCloseCalendar = () => {
    setCalendarVisible(false);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">User Selector Example</h1>
        <UserSelector users={users} onSelect={handleUserSelect} />
      </div>
     
        <button
          onClick={handleCalendarClick}
          className="mt-10 px-4 mb-10 py-2 bg-blue-500 text-white rounded-md"
        >
          Calendar
        </button>
      {isCalendarVisible && <Calendar onClose={handleCloseCalendar} />}
    </div>
  );
};

export default HomePage;
