import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { certificateTypes, generateCertificateData } from '../data/mockData';
import RegionalCertificates from '../components/RegionalCertificates';

const regions = [
  'North', 'North-East', 'North-West', 'West', 
  'South West', 'South', 'South-East', 'New Delhi',
  'Central', 'Shahdara', 'East',
];

export default function Certificates() {
  // State to track selected region
  const [selectedRegion, setSelectedRegion] = useState('All');

  // Fetch data based on the selected region
  const certData = generateCertificateData(selectedRegion);
  console.log(certData)

  const doughnutData = {
    labels: certificateTypes,
    datasets: [{
      data: certData.map(d => d.count),
      backgroundColor: [
        'rgba(255, 99, 132, 0.4)',
        'rgba(54, 162, 235, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(75, 192, 192, 0.4)',
        'rgba(153, 102, 255, 0.4)',
        'rgba(255, 159, 64, 0.4)',
        'rgba(199, 199, 199, 0.4)',
        'rgba(83, 102, 255, 0.4)',
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
    }]
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const
      },
      title: {
        display: true,
        text: 'Certificate Distribution'
      }
    }
  };

  return (
    <div className="shadow-sm space-y-6">
      <div className="flex justify-between items-center ">
        <h2 className="text-2xl font-bold text-gray-800">Certificates Overview</h2>

        {/* Dropdown Menu for Region Selection */}
        <div>
          <label htmlFor="region" className="sr-only">Select Region</label>
          <select
            id="region"
            className="p-2 border border-gray-300 rounded-lg"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option>
              All
            </option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-95 duration-300">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-95 duration-300">
          <h3 className="text-lg font-semibold mb-4">Certificate Details</h3>
          <div className="space-y-4">
            {certData.map((cert) => (
              <div key={cert.type} className="flex justify-between items-center border-b pb-2">
                <div>
                  <h4 className="font-medium">{cert.type}</h4>
                </div>
                <div className="text-right">
                  <p className="font-medium">{cert.count} total</p>
                  <p className="text-sm text-gray-600">
                    {cert.pending} pending
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <RegionalCertificates />
    </div>
  );
}
