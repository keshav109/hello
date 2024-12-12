import React from 'react';
import { Upload, CheckCircle } from 'lucide-react';
import { DocumentStatus } from '../types';
import { Toast } from './Toast';
import { useToast } from '../hooks/useToast';

interface DocumentUploadProps {
  onFileChange: (name: string, file: File) => void;
  documentStatus: DocumentStatus;
  onDocumentStatusChange: (status: DocumentStatus) => void;
}

export function DocumentUpload({ 
  onFileChange, 
  documentStatus, 
  onDocumentStatusChange 
}: DocumentUploadProps) {
  const { toast, showToast, hideToast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        if (file.size <= 2 * 1024 * 1024) {
          try {
            onFileChange(name, file);
            onDocumentStatusChange({
              ...documentStatus,
              [name]: true
            });
            showToast(`${name.replace(/([A-Z])/g, ' $1').trim()} uploaded successfully!`);
          } catch (error) {
            alert('Error uploading file. Please try again.');
          }
        } else {
          alert('File size should not exceed 2MB');
        }
      } else {
        alert('Please upload PDF files only');
      }
    }
  };

  const documents = [
    { name: 'aadharCard', label: 'Aadhar Card', required: true },
    { name: 'photo', label: 'Passport Size Photo', required: true },
    { name: 'itReturns', label: 'IT Returns (if applicable)', required: false },
    { name: 'paySlips', label: 'Pay Slips', required: true },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Required Documents</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map(({ name, label, required }) => (
          <div key={name} className="relative">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
              </label>
              {documentStatus[name as keyof DocumentStatus] && (
                <div className="flex items-center text-green-600 text-sm">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span>Uploaded</span>
                </div>
              )}
            </div>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-500 transition-colors">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      name={name}
                      className="sr-only"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, name)}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">PDF up to 2MB</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {toast && <Toast message={toast.message} onClose={hideToast} />}
    </div>
  );
}