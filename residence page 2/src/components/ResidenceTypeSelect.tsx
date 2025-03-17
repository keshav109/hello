import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { ResidentFormData } from '../types/form';

interface ResidenceTypeSelectProps {
  register: UseFormRegister<ResidentFormData>;
  error?: string;
}

export const ResidenceTypeSelect: React.FC<ResidenceTypeSelectProps> = ({ register, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Type of Residence <span className="text-red-500">*</span>
      </label>
      <select
        {...register('residenceType')}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select type</option>
        <option value="owned">Owned</option>
        <option value="rented">Rented</option>
        <option value="other">Other</option>
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};