import React, { useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  TimeScale
);

type LineGraphType = {
  dataPoints: string[];
};

const LineGraph: React.FC<LineGraphType> = ({ dataPoints }) => {
  const exes = [1, 2, 3, 4, 5, 6, 7, 8];
  const ys0 = [2, 5, 32, 12, 10, 15, 20];
  const ys = [4, 4, 4, 4, 4, 4, 10, 4];
  const timestamps: string[] = [];
  const values: number[] = [];

  dataPoints.forEach((dataPoint) => {
    const [timestamp, value] = dataPoint.split(" ");
    timestamps.push(timestamp.slice(11, 16));
    values.push(parseFloat(value));
  });

  console.log("ts", timestamps);
  console.log("values", values);

  const chartData = {
    // labels: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
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

  const chartOptions = {
    plugins: {
      legend: true,
    },
    scales: {
      x: {
        // type: "time",
        // time: {
        //   unit: "hour",
        // },
        title: {
          display: true,
          text: "Timefooo",
        },
      },
      y: {
        title: {
          display: true,
          text: "Valuefooo",
        },
      },
    },
  };

  return (
    <div style={{ width: 600, height: 600 }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineGraph;
