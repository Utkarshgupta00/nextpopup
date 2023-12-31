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
    console.log('Month clicked');
  };

  const handleYearClick = () => {
    console.log('Year clicked');
  };

  const renderCalendar = () => {
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const firstDay = getFirstDayOfMonth(displayedYear, displayedMonth);
    const totalDays = getDaysInMonth(displayedYear, displayedMonth);
    const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

    const scheduleData = {
      '2023-12-05': [
        { time: '10:00 AM', task: 'Batch001' },
        { time: '02:00 PM', task: 'Batch002' },
      ],
      '2023-12-15': [
        { time: '02:30 PM', task: 'Batch003' },
        { time: '04:00 PM', task: 'Batch004' },
      ],
      '2023-12-20': [
        { time: '11:00 AM', task: 'Batch005' },
        { time: '03:30 PM', task: 'Batch006' },
      ],
      '2023-12-25': [
        { time: '09:30 AM', task: 'Batch007' },
        { time: '01:00 PM', task: 'Batch008' },
      ],
      // Add more schedule data as needed
    };

    const previousMonthDays = getDaysInMonth(
      displayedMonth === 0 ? displayedYear - 1 : displayedYear,
      displayedMonth === 0 ? 11 : displayedMonth - 1
    );
    const previousMonthStart = previousMonthDays - firstDay + 1;
    const previousMonthDates = Array.from({ length: firstDay }, (_, i) => previousMonthStart + i);

    const remainingCells = 42 - (previousMonthDates.length + daysArray.length);
    const nextMonthDates = Array.from({ length: remainingCells }, (_, i) => i + 1);

    const allDates = [...previousMonthDates, ...daysArray, ...nextMonthDates];

    return (
      <div className="grid grid-cols-7 gap-1">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-bold text-black">
            {day}
          </div>
        ))}
        {allDates.map((day, index) => {
          const isLiveMonth = displayedMonth === currentMonth && displayedYear === currentYear;
          const currentDateStr = `${displayedYear}-${displayedMonth + 1}-${day}`;
          const daySchedule = scheduleData[currentDateStr] || [];

          const isBeyondCurrentMonth = day > totalDays;

          const hasFirstTask = daySchedule.length > 0;
          const hasSecondTask = daySchedule.length > 1;

          return (
            <div
              key={index}
              className={`lg:p-10 p-7 ${
                day === 1 && !isBeyondCurrentMonth ? 'lg:text-xl text-md font-bold' : ''
              } ${
                (day === currentDay && isLiveMonth) ? 'bg-blue-500 text-white' : ''
              } ${
                isBeyondCurrentMonth ? 'text-gray-400' : 'bg-gray-200 cursor-pointer'
              } text-black relative`} // Added 'relative' class to allow absolute positioning of circles
            >
              {day === 1 && !isBeyondCurrentMonth ? '1st' : isBeyondCurrentMonth ? '' : day}




              {daySchedule.length > 0 && (
                <div className="text-sm">
                  {daySchedule.map((schedule, scheduleIndex) => (
                    <div key={scheduleIndex}>
                                    
                      {schedule.time}: {schedule.task}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full h-full p-4 bg-white">
      <div className="flex mb-14">
        <div className="cursor-pointer" onClick={handlePrevMonth}>
          <span className="text-black m-10 text-2xl ">&#8249;</span>
        </div>
        <div className="flex items-center">
          <select
            value={displayedMonth}
            onChange={handleMonthChange}
            className="text-black border-none bg-g p-2 mr-2 "
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
          <span className="text-black ml-10 text-2xl">&#8250;</span>
        </div>
      </div>
      {renderCalendar()}
    </div>
  );
};

export default Calendar;
