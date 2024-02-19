import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./App.scss";

function App() {
  const [data, setData] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<Date | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          // "https://tsserv.tinkermode.dev/data?begin=2023-05-24T00:00:00Z&end=2023-05-24T23:59:59Z"
          "https://tsserv.tinkermode.dev/data?begin=2021-03-04T03:45:00Z&end=2021-03-04T04:17:00Z"
        );

        if (!response.ok) {
          throw new Error("Non-200 response");
        }

        const timeSeries = await response.text();
        setData(timeSeries);
      } catch (error) {
        console.log("Fetch error: ", error);
      }
    };
    fetchData();
  }, []);

  // console.log("new data", data, typeof data);
  // console.log("selectedDate", selectedDate);

  return (
    <div className="time-series-app">
      <DatePicker
        onChange={(date) => date && setSelectedDate(date)}
        selected={selectedDate}
      />
      show {data}
    </div>
  );
}

export default App;
