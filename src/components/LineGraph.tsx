import React, { useState } from "react";
import {
  Chart as ChartJS,
  ChartOptions,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Tooltip,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Tooltip,
  TimeScale
);

type LineGraphType = {
  dataPoints: string[];
};

const LineGraph: React.FC<LineGraphType> = ({ dataPoints }) => {
  const timestamps: string[] = [];
  const values: number[] = [];

  console.log("dataPoints", dataPoints[618], typeof dataPoints[618]);
  dataPoints.forEach((dataPoint, index) => {
    timestamps.push(dataPoint.slice(11, 19));
    values.push(parseFloat(dataPoint.slice(21).trim()));
  });

  console.log("ts", timestamps[618]);
  console.log("value", values[618]);
  // console.log("ts", timestamps);
  // console.log("values", values);

  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: "Value",
        data: values,
        fill: false,
        tension: 0.4,
        backgroundColor: "red",
        borderColor: "green",
        pointBorderColor: "purple",
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    scales: {
      x: {
        // type: "time",
        // time: {
        //   unit: "hour",
        // },
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineGraph;
