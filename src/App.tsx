import React from "react";
import { create } from "zustand";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LineGraph from "./components/LineGraph.tsx";
import DataTable from "./components/DataTable.tsx";
import { AppState } from "./types/types.tsx";
import "./App.scss";

const START_TIME = "00:00:00";
const END_TIME = "23:59:59";

const useAppState = create<AppState>((set, getState) => ({
  selectedDate: null,
  setSelectedDate: (date) => set({ selectedDate: date }),
  displayedDate: null,
  setDisplayedDate: (date) => set({ displayedDate: date }),
  data: [],
  error: null,
  setError: (error) => set({ error }),
  fetchData: async () => {
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

    const convertDateFormat = (date: Date) => {
      return date.toISOString().slice(0, 10);
    };
    const { selectedDate, setDisplayedDate, setError } = getState();

    if (!selectedDate) return;
    const dateISOString = convertDateFormat(selectedDate);
    try {
      const response = await fetch(
        `https://tsserv.tinkermode.dev/data?begin=${dateISOString}T${START_TIME}Z&end=${dateISOString}T${END_TIME}Z`
      );

      if (!response.ok) {
        throw new Error("Non-200 response");
      }
      const timeSeries = await response.text();
      setDisplayedDate(selectedDate);
      set({ data: organizeData(timeSeries) });
    } catch (error) {
      console.log("Fetch error: ", error);
      setError("Failed to fetch data from server");
    }
  },
}));
function App() {
  const {
    displayedDate,
    selectedDate,
    setSelectedDate,
    data,
    fetchData,
    error,
  } = useAppState();

  const customCalendarContainer = ({ className, children }) => (
    <div style={{ position: "relative", left: "20%" }}>
      <CalendarContainer className={className}>{children}</CalendarContainer>
    </div>
  );

  return (
    <div className="time-series-app">
      <h1 className="heading">Time Series</h1>
      <p className="instruction">
        Select a date in the input field to see the time data on that day.
      </p>
      <div className="flex-container">
        <DatePicker
          placeholderText="Select a date"
          onChange={(date) => date && setSelectedDate(date)}
          selected={selectedDate}
          calendarContainer={customCalendarContainer}
        />
        <button
          className="fetch-button"
          disabled={!selectedDate}
          onClick={fetchData}
        >
          Fetch Data
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {data.length > 0 && (
        <div className="data-display-container">
          <h3>{`Time Series on ${displayedDate?.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}`}</h3>
          <LineGraph data={data} />
          <h3>Table</h3>
          <DataTable data={data} />
        </div>
      )}
    </div>
  );
}

export default App;
