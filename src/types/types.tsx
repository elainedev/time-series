type AppState = {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  displayedDate: Date | null;
  setDisplayedDate: (date: Date | null) => void;
  data: PointType[];
  fetchData: () => void;
  error: string | null;
  setError: (error: string | null) => void;
};

type PointType = {
  x: string; // timestamp
  y: number; // value
};

type TimeSeriesDataType = {
  data: PointType[];
};

export { AppState, PointType, TimeSeriesDataType };
