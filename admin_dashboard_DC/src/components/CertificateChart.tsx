import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { certificateTypes, generateCertificateData } from '../data/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function CertificateChart() {
  const certData = generateCertificateData('All');

  const data = {
    labels: certificateTypes,
    datasets: [
      {
        label: 'Total Certificates',
        data: certData.map(d => d.count),
        backgroundColor: [
          'rgba(79, 70, 229, 0.2)',   // Indigo
          'rgba(34, 197, 94, 0.2)',   // Green
          'rgba(234, 179, 8, 0.2)',   // Yellow
          'rgba(239, 68, 68, 0.2)',   // Red
          'rgba(16, 185, 129, 0.2)',  // Teal
          'rgba(99, 102, 241, 0.2)',  // Blue
          'rgba(236, 72, 153, 0.2)'   // Pink
        ],
        borderColor: [
          'rgba(79, 70, 229, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(234, 179, 8, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(99, 102, 241, 1)',
          'rgba(236, 72, 153, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Certificate Distribution by Type',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <Bar data={data} options={options} />
    </div>
  );
}
