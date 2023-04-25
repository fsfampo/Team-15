import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['Full Body', 'High Intensity training', 'Yoga', 'HIIT', 'Pilates', 'Strength', 'Upper Body'];

const data = {
  labels,
  datasets: [
    {
      label: 'No. of Users',
      data: [122, 49, 62, 135, 89, 127, 158],
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    {
      label: 'Workouts',
      data: [312, 150, 210, 445, 324, 587, 678],
      backgroundColor: 'rgba(0, 0, 0)',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

export function Dbchart() {
  return <Bar data={data} options={options} />;
}