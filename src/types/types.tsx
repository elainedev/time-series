type PointType = {
  x: Date; // timestamp
  y: number; // value
};

type TimeSeriesDataType = {
  data: PointType[];
};

export { PointType, TimeSeriesDataType };
