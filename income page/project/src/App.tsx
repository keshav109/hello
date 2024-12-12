import React, { useState, useEffect } from 'react';
import { FormData, DocumentStatus } from './types';
import { DocumentUpload } from './components/DocumentUpload';
import { AddressForm } from './components/AddressForm';
import { IncomeDetailsForm } from './components/IncomeDetailsForm';
import { User, KeyRound } from 'lucide-react';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [canSubmit, setCanSubmit] = useState(false);
  const [isAadharVerified, setIsAadharVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [documentStatus, setDocumentStatus] = useState<DocumentStatus>({
    aadharCard: false,
    photo: false,
    itReturns: false,
    paySlips: false,
  });

  const [formData, setFormData] = useState<FormData>({
    applicationType: 'self',
    applicantName: '',
    dateOfBirth: '',
    gender: 'male',
    rationCardNumber: '',
    aadharNumber: '',
    address: {
      doorNumber: '',
      district: '',
      block: '',
      village: '',
      secretariat: '',
      pinCode: '',
    },
    incomeDetails: {
      landIncome: 0,
      businessIncome: 0,
      buildingIncome: 0,
      laborIncome: 0,
      salaryIncome: 0,
      otherIncome: 0,
    },
    documents: {},
  });

  useEffect(() => {
    const requiredDocuments = ['aadharCard', 'photo', 'paySlips'];
    const hasRequiredDocuments = requiredDocuments.every(
      (doc) => documentStatus[doc as keyof DocumentStatus]
    );
    setCanSubmit(hasRequiredDocuments && isAadharVerified);
  }, [documentStatus, isAadharVerified]);

  const handleDocumentUpload = (name: string, file: File) => {
    setFormData((prev) => ({
      ...prev,
      documents: { ...prev.documents, [name]: file },
    }));
  };

  const verifyAadhar = () => {
    // Simulate OTP verification
    if (formData.aadharNumber.length === 12) {
      // In a real app, this would make an API call
      setOtp('123456');
    } else {
      alert('Please enter a valid 12-digit Aadhar number');
    }
  };

  const verifyOtp = () => {
    // Simulate OTP verification
    if (otp === '123456') {
      setIsAadharVerified(true);
    } else {
      alert('Invalid OTP');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Application Type</label>
              <div className="mt-2 space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="applicationType"
                    value="self"
                    checked={formData.applicationType === 'self'}
                    onChange={(e) => setFormData({ ...formData, applicationType: 'self' })}
                    className="form-radio"
                  />
                  <span className="ml-2">Self</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="applicationType"
                    value="parent"
                    checked={formData.applicationType === 'parent'}
                    onChange={(e) => setFormData({ ...formData, applicationType: 'parent' })}
                    className="form-radio"
                  />
                  <span className="ml-2">Parent</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Applicant Name</label>
                <input
                  type="text"
                  value={formData.applicantName}
                  onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' | 'other' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ration Card Number</label>
                <input
                  type="text"
                  value={formData.rationCardNumber}
                  onChange={(e) => setFormData({ ...formData, rationCardNumber: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            {formData.applicationType === 'parent' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Guardian Type</label>
                  <select
                    value={formData.guardianType}
                    onChange={(e) => setFormData({ ...formData, guardianType: e.target.value as 'mother' | 'father' | 'guardian' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="mother">Mother</option>
                    <option value="father">Father</option>
                    <option value="guardian">Guardian</option>
                  </select>
                </div>
                {formData.guardianType === 'guardian' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Relation with Guardian</label>
                    <input
                      type="text"
                      value={formData.guardianRelation}
                      onChange={(e) => setFormData({ ...formData, guardianRelation: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  
                )}
                <div>
                <label className="block text-sm font-medium text-gray-700">Guardian Name</label>
                <input
                  type="text"
                  value={formData.applicantName}
                  onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
                
              </div>
            )}
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Aadhar Number</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  pattern="[0-9]{12}"
                  maxLength={12}
                  value={formData.aadharNumber}
                  onChange={(e) => setFormData({ ...formData, aadharNumber: e.target.value })}
                  className="flex-1 rounded-none rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter 12-digit Aadhar number"
                />
                <button
                  type="button"
                  onClick={verifyAadhar}
                  className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-700 hover:bg-gray-100"
                >
                  Verify
                </button>
              </div>
            </div>

            {otp && !isAadharVerified && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="flex-1 rounded-none rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter OTP"
                  />
                  <button
                    type="button"
                    onClick={verifyOtp}
                    className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-700 hover:bg-gray-100"
                  >
                    Verify OTP
                  </button>
                </div>
              </div>
            )}

            {isAadharVerified && (
              <>
                <div className="rounded-md bg-green-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <User className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800">
                        Aadhar verification successful!
                      </p>
                    </div>
                  </div>
                </div>

                <AddressForm
                  address={formData.address}
                  onChange={(address) => setFormData({ ...formData, address })}
                />
              </>
            )}
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <IncomeDetailsForm
              incomeDetails={formData.incomeDetails}
              onChange={(incomeDetails) => setFormData({ ...formData, incomeDetails })}
            />
            <DocumentUpload
              onFileChange={handleDocumentUpload}
              documentStatus={documentStatus}
              onDocumentStatusChange={setDocumentStatus}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
          <h1 className="text-lg font-medium leading-6 text-gray-900">
            Income Certificate Application Form
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="mb-8 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`flex items-center ${
                    currentStep >= step ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                      currentStep >= step
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-300'
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`h-0.5 w-12 ${
                        currentStep > step ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {renderStep()}

          <div className="flex justify-between pt-5">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Previous
              </button>
            )}
            <button
              type={currentStep === 3 ? 'submit' : 'button'}
              onClick={() => currentStep < 3 && setCurrentStep(currentStep + 1)}
              disabled={currentStep === 3 && !canSubmit}
              className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                currentStep === 3 && !canSubmit
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {currentStep === 3 ? 'Submit' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;