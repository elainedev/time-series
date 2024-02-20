import React, { useEffect, useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LineGraph from "./components/LineGraph.tsx";
import { PointType } from "./types/types.tsx";
import "./App.scss";

const START_TIME = "00:00:00";
const END_TIME = "23:59:59";

function App() {
  const [data, setData] = useState<PointType[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // convert dates to ISO/RFC3339 format
  const convertDateFormat = (date: Date) => {
    return date.toISOString().slice(0, 10);
  };

  // put data points into an array
  const organizeData = (data: string) =>
    data
      ? data
          .split("\n")
          .filter((dataPoint) => Boolean(dataPoint))
          .map((dataPoint) => ({
            x: `${dataPoint.slice(0, 20)}`, // timestamp
            y: parseFloat(dataPoint.slice(21).trim()), // value
          }))
      : [];

  useEffect(() => {
    const fetchData = async () => {
      // if (!selectedDate) return;
      // const dateISOString = convertDateFormat(selectedDate);

      try {
        const response = await fetch(
          // `https://tsserv.tinkermode.dev/data?begin=${dateISOString}T${START_TIME}Z&end=${dateISOString}T${END_TIME}Z`
          // "https://tsserv.tinkermode.dev/data?begin=2021-03-04T03:45:00Z&end=2021-03-04T04:17:00Z"
          `https://tsserv.tinkermode.dev/data?begin=2023-12-31T${START_TIME}Z&end=2023-12-31T${END_TIME}Z`
        );

        if (!response.ok) {
          throw new Error("Non-200 response");
        }
        const timeSeries = await response.text();
        setData(organizeData(timeSeries));
      } catch (error) {
        console.log("Fetch error: ", error); // TODO make UI display error message
      }
    };
    fetchData();
  }, []);

  const customCalendarContainer = ({ className, children }) => (
    <div style={{ position: "relative", left: "20%" }}>
      <CalendarContainer className={className}>{children}</CalendarContainer>
    </div>
  );
  console.log("where my data", data.slice(0, 10));
  return (
    <div className="time-series-app">
      <div className="flex-container">
        <DatePicker
          onChange={(date) => date && setSelectedDate(date)}
          selected={selectedDate}
          calendarContainer={customCalendarContainer}
        />
        {/* <button disabled={!selectedDate} onClick={fetchData}>
          Fetch Data
        </button> */}
      </div>
      {data.length && <LineGraph data={data} />}
    </div>
  );
}

export default App;
