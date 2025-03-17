import React from 'react';
import { Upload } from 'lucide-react';
import { UseFormRegister } from 'react-hook-form';
import { ResidentFormData } from '../types/form';

interface PhotoUploadProps {
  register: UseFormRegister<ResidentFormData>;
  error?: string;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({ register, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Self Attested Photo <span className="text-red-500">*</span>
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
              <span>Upload a file</span>
              <input
                type="file"
                className="sr-only"
                accept="image/*"
                {...register('photo')}
              />
            </label>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};