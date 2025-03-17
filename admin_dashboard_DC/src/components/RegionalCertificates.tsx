import React from 'react';
import { generateRegionalData, certificateTypes } from '../data/mockData';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function RegionalCertificates() {
  const data = generateRegionalData();

  // Color palette for doughnut charts
  const colorPalettes = [
    ['rgba(34, 197, 94, 0.8)', 'rgba(234, 179, 8, 0.8)', 'rgba(239, 68, 68, 0.8)'],
    ['rgba(59, 130, 246, 0.8)', 'rgba(147, 51, 234, 0.8)', 'rgba(244, 114, 182, 0.8)'],
    ['rgba(45, 212, 191, 0.8)', 'rgba(249, 115, 22, 0.8)', 'rgba(168, 85, 247, 0.8)'],
    ['rgba(45, 212, 191, 0.8)', 'rgba(249, 115, 22, 0.8)']
  ];

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 20,
        }
      },
      title: {
        display: false,
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Regional Certificate Distribution</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.slice(0,11).map((regionData, index) => {
          const chartData = {
            labels: ['Approved', 'Pending', 'Rejected'],
            datasets: [{
              data: [regionData.approved, regionData.pending, regionData.rejected],
              backgroundColor: colorPalettes[index % colorPalettes.length],
              borderWidth: 1
            }]
          };

          return (
            <div key={regionData.region} className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
              <h3 className="text-lg font-semibold mb-4 text-center">
                {regionData.region}
              </h3>
              <div className="h-64">
                <Doughnut 
                  data={chartData} 
                  options={{
                    ...doughnutOptions,
                    plugins: {
                      ...doughnutOptions.plugins,
                      title: {
                        display: true,
                        text: `Total: ${regionData.approved + regionData.pending + regionData.rejected}`
                      }
                    }
                  }} 
                />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-sm font-medium text-green-600">Approved</p>
                  <p className="font-bold">{regionData.approved}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-yellow-600">Pending</p>
                  <p className="font-bold">{regionData.pending}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-red-600">Rejected</p>
                  <p className="font-bold">{regionData.rejected}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}