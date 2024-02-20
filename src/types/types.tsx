type PointType = {
  x: string; // timestamp
  y: number; // value
};

type TimeSeriesDataType = {
  data: PointType[];
};

export { PointType, TimeSeriesDataType };
