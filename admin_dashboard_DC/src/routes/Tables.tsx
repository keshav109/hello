import React from 'react';
import { generateRegionalData } from '../data/mockData';

export default function Tables() {
  const regionalData = generateRegionalData();

  // Function to conditionally apply colors based on percentage
  const getColorClass = (value: number, type: 'load' | 'efficiency') => {
    if (type === 'efficiency') {
      if (value > 80) return 'text-green-600';
      if (value > 50) return 'text-yellow-600';
      return 'text-red-600';
    }
    if (type === 'load') {
      if (value > 35) return 'bg-red-100 text-red-600';
      if (value > 25) return 'bg-yellow-100 text-yellow-600';
      return 'bg-green-100 text-green-600';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Regional Certificate Status</h2>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approved</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rejected</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Load</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {regionalData.map((region, idx) => (
                <tr key={region.region} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{region.region}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{region.pending}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                    getColorClass(region.approved, 'efficiency')}`}>{region.approved}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{region.rejected}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                    getColorClass(region.load, 'load')}`}>{region.load}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                    getColorClass(region.efficiency, 'efficiency')}`}>{region.efficiency}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
