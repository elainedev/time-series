import React, { useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./App.scss";

const START_TIME = "00:00:00";
const END_TIME = "23:59:59";

function App() {
  const [data, setData] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<Date | null>();

  const convertDateFormat = (date: Date) => {
    return date.toISOString().slice(0, 10);
  };

  const fetchData = async () => {
    if (!selectedDate) return;
    const dateISOString = convertDateFormat(selectedDate);

    try {
      const response = await fetch(
        `https://tsserv.tinkermode.dev/data?begin=${dateISOString}T${START_TIME}Z&end=${dateISOString}T${END_TIME}Z`
        // "https://tsserv.tinkermode.dev/data?begin=2021-03-04T03:45:00Z&end=2021-03-04T04:17:00Z"
      );

      if (!response.ok) {
        throw new Error("Non-200 response");
      }
      const timeSeries = await response.text();
      setData(timeSeries);
    } catch (error) {
      console.log("Fetch error: ", error); // TODO make UI display error message
    }
  };

  const customCalendarContainer = ({ className, children }) => (
    <div style={{ position: "relative", left: "20%" }}>
      <CalendarContainer className={className}>{children}</CalendarContainer>
    </div>
  );

  return (
    <div className="time-series-app">
      <div className="cta-container">
        <DatePicker
          onChange={(date) => date && setSelectedDate(date)}
          selected={selectedDate}
          calendarContainer={customCalendarContainer}
        />
        <button disabled={!selectedDate} onClick={fetchData}>
          Fetch Data
        </button>
      </div>
      show {data}
    </div>
  );
}

export default App;
