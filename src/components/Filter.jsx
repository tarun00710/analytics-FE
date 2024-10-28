import React, { useEffect, useState } from "react";
import DateRangePicker from "./DatePicker";

const FilterComponent = ({ onFilterSubmit, filters, clearPreferences }) => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (filters) {
      setAge(filters.age);
      setGender(filters.gender);
      setStartDate(filters.startDate);
      setEndDate(filters.endDate);
    }
  }, [filters.age, filters.gender, filters.startDate, filters.endDate]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (startDate && endDate && gender && age) {
      onFilterSubmit({ startDate, endDate, gender, age });
    } else {
      alert("All fields are required!");
    }
  };

  const handleDateChange = (dates) => {
    setStartDate(dates.startDate);
    setEndDate(dates.endDate);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="filters">
        <DateRangePicker
          onDateChange={handleDateChange}
          startDate={startDate}
          endDate={endDate}
        />

        <div>
          <label>Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select a Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label>Age:</label>
          <select value={age} onChange={(e) => setAge(e.target.value)} required>
            <option value="">Select Age Group</option>
            <option value="15-25">15-25</option>
            <option value=">25">25 +</option>
          </select>
        </div>
        <button type="submit">Submit</button>
        <button onClick={clearPreferences}>Clear Preferences</button>
      </div>
    </form>
  );
};

export default FilterComponent;
