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
import "chartjs-adapter-luxon";
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

type PointType = {
  x: Date | string;
  y: number;
};

const LineGraph: React.FC<LineGraphType> = ({ dataPoints }) => {
  const getLinePoints = (points) => {
    const pointsData: PointType[] = [];

    points.forEach((point) => {
      pointsData.push({
        x: `${point.slice(0, 20)}`,
        y: parseFloat(point.slice(21).trim()),
      });
    });
    return pointsData;
  };

  const chartData = {
    datasets: [
      {
        label: " Value: ",
        data: getLinePoints(dataPoints),
        fill: false,
        tension: 0.4,
        backgroundColor: "maroon",
        pointBorderColor: "purple",
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
          displayFormats: {
            hour: "H:mm",
          },
        },
        adapters: {
          date: {
            zone: "UTC",
          },
        },
        title: {
          display: true,
          text: "Time (UTC+0)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (context) =>
            `Time: ${new Date(context[0].parsed.x)
              .toISOString()
              .slice(11, 19)} UTC`,

          label: (context) => `${context.dataset.label}${context.parsed.y}`,
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
