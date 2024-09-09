import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';

// Register the components needed for the chart
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const ChartsDoughnt = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],

    datasets: [
      {
        label: 'Users',
        data: [50, 60, 40, 80, 40, 140, 110], // Data for the line
        fill: false, // Do not fill the area under the line
        borderColor: 'rgba(249, 101, 17, .85)', // Line color
        tension: 0.1, // Smoothness of the line
      },
      {
        label: 'Properites',
        data: [15, 22, 17, 23, 54, 66, 48], // Data for the line
        fill: false, // Do not fill the area under the line
        borderColor: 'rgba(126, 249, 17, .85)', // Line color
        tension: 0.1, // Smoothness of the line
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <Line
      data={data}
      options={options}
    />
  );
};

export default ChartsDoughnt;
