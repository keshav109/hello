import React from 'react';
import { IncomeDetails } from '../types';

interface IncomeDetailsFormProps {
  incomeDetails: IncomeDetails;
  onChange: (details: IncomeDetails) => void;
}

export function IncomeDetailsForm({ incomeDetails, onChange }: IncomeDetailsFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...incomeDetails, [name]: parseFloat(value) || 0 });
  };

  const totalIncome = Object.values(incomeDetails).reduce((sum, value) => sum + value, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Income from Lands</label>
          <input
            type="number"
            name="landIncome"
            value={incomeDetails.landIncome}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Income from Business</label>
          <input
            type="number"
            name="businessIncome"
            value={incomeDetails.businessIncome}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Income from Buildings</label>
          <input
            type="number"
            name="buildingIncome"
            value={incomeDetails.buildingIncome}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Income from Labor</label>
          <input
            type="number"
            name="laborIncome"
            value={incomeDetails.laborIncome}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Salary Income</label>
          <input
            type="number"
            name="salaryIncome"
            value={incomeDetails.salaryIncome}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Other Income</label>
          <input
            type="number"
            name="otherIncome"
            value={incomeDetails.otherIncome}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="pt-4 border-t border-gray-200">
        <p className="text-lg font-semibold">
          Total Income: ₹{totalIncome.toLocaleString('en-IN')}
        </p>
      </div>
    </div>
  );
}