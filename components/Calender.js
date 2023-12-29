// components/Calendar.js
import { useState, useEffect } from 'react';

const Calendar = () => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [displayedMonth, setDisplayedMonth] = useState(currentDate.getMonth());
  const [displayedYear, setDisplayedYear] = useState(currentDate.getFullYear());
  const [calendarData, setCalendarData] = useState([]);

  useEffect(() => {

    console.log(`Fetch data for ${displayedYear}-${displayedMonth + 1}`);

    const firstDay = getFirstDayOfMonth(displayedYear, displayedMonth);
    const totalDays = getDaysInMonth(displayedYear, displayedMonth);
    const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);
    const updatedCalendarData = [...Array(firstDay).fill(null), ...daysArray];
    setCalendarData(updatedCalendarData);
  }, [displayedMonth, displayedYear]);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setDisplayedMonth((prevMonth) => {
      const newMonth = prevMonth === 0 ? 11 : prevMonth - 1;
      setDisplayedYear((prevYear) => (prevMonth === 0 ? prevYear - 1 : prevYear));
      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setDisplayedMonth((prevMonth) => {
      const newMonth = prevMonth === 11 ? 0 : prevMonth + 1;
      setDisplayedYear((prevYear) => (prevMonth === 11 ? prevYear + 1 : prevYear));
      return newMonth;
    });
  };

  const handleMonthChange = (e) => {
    setDisplayedMonth(parseInt(e.target.value, 10));
  };

  const handleYearChange = (e) => {
    setDisplayedYear(parseInt(e.target.value, 10));
  };

  const handleMonthClick = () => {
    // You can implement month navigation here
    console.log('Month clicked');
  };

  const handleYearClick = () => {
    // You can implement year navigation here
    console.log('Year clicked');
  };



const renderCalendar = () => {
    const currentDay = currentDate.getDate(); // Get the current day
    const firstDay = getFirstDayOfMonth(displayedYear, displayedMonth);
    const totalDays = getDaysInMonth(displayedYear, displayedMonth);
    const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);
  
    return (
      <div className="grid grid-cols-7 gap-1">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-bold text-black">
            {day}
          </div>
        ))}
        {calendarData.map((day, index) => (
          <div
            key={index}
            className={`lg:p-10 p-7 ${
              day === currentDay ? 'bg-blue-500 text-white' : day ? 'bg-gray-200 cursor-pointer' : 'bg-gray-100'
            } text-black`}
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-full p-4 bg-white">
      <div className="flex mb-14">
        <div className="cursor-pointer" onClick={handlePrevMonth}>
          <span className="text-black">&#8249;</span>
        </div>
        <div className="flex items-center">
          <select
            value={displayedMonth}
            onChange={handleMonthChange}
            className="text-black border-none p-2 mr-2"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
                  new Date(currentDate.getFullYear(), i, 1)
                )}
              </option>
            ))}
          </select>
          <select
            value={displayedYear}
            onChange={handleYearChange}
            className="text-black  border-none p-2"
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={currentDate.getFullYear() - 5 + i}>
                {currentDate.getFullYear() - 5 + i}
              </option>
            ))}
          </select>
        </div>
        <div className="cursor-pointer" onClick={handleNextMonth}>
          <span className="text-black">&#8250;</span>
        </div>
      </div>
      {renderCalendar()}
    </div>
  );
};

export default Calendar;
