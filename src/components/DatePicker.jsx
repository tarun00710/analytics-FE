import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = ({ onDateChange, startDate: ini, endDate: iniE }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      onDateChange({ startDate: start, endDate: end });
      setIsOpen(false);
    }
  };

  useEffect(() => {
    setStartDate(ini);
    setEndDate(iniE);
  }, [ini, iniE]);

  return (
    <div className="date-range-picker">
      <label>Select Date Range:</label>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline={false}
        dateFormat="yyyy/MM/dd"
        placeholderText="Select start and end date"
        onFocus={() => setIsOpen(true)} 
        onCalendarClose={() => setIsOpen(false)} 
        open={isOpen}
      />
    </div>
  );
};

export default DateRangePicker;
