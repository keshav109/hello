import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { generateRegionalData } from '../data/mockData';

// Register required Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function KPI() {
  const data = generateRegionalData();

  function averageTimePerCompletedCertificate(){
    let totalRegion = data.length;
    let totalTimeTakenPerComletedCertificate = 0;
    for(let i=0; i<totalRegion; i++){
      let completed = data[i].approved + data[i].rejected
      let timeTakenPerCompletedCertificate = data[i].timeTaken/completed
      totalTimeTakenPerComletedCertificate += timeTakenPerCompletedCertificate
    }

    return totalTimeTakenPerComletedCertificate/totalRegion
  }


  const radarData = {
    labels: data.slice(0, 8).map(d => d.region),
    datasets: [
      {
        label: 'Worker Load',
        data: data.slice(0, 8).map(d => d.load),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        pointBackgroundColor: 'rgb(75, 192, 192)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(75, 192, 192)'
      },
      {
        label: 'Efficiency',
        data: data.slice(0, 8).map(d => d.efficiency),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgb(153, 102, 255)',
        pointBackgroundColor: 'rgb(153, 102, 255)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(153, 102, 255)'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Regional Performance Matrix'
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Worker Performance Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Performance Matrix</h3>
          <Radar data={radarData} options={options} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Performance Summary</h3>
          <div className="space-y-4">
            {data.slice(0, 5).map((region) => (
              <div key={region.region} className="border-b pb-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{region.region}</span>
                  <span className="text-sm text-gray-600">{region.load}% Load</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 rounded-full h-2"
                    style={{ width: `${region.efficiency}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}