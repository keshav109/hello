import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { FormInput } from './components/FormInput';
import { ResidenceTypeSelect } from './components/ResidenceTypeSelect';
import { PhotoUpload } from './components/PhotoUpload';
import { ResidentFormData } from './types/form';
import { verifyAadhaar } from './services/aadhaarService';

const schema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  fatherName: z.string().min(1, "Father's name is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  mobileNumber: z.string().regex(/^\d{10}$/, 'Invalid mobile number'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
  block: z.string().min(1, 'Block is required'),
  pinCode: z.string().regex(/^\d{6}$/, 'Invalid PIN code'),
  district: z.string().min(1, 'District is required'),
  wardNo: z.string().min(1, 'Ward number is required'),
  policeStation: z.string().min(1, 'Police station is required'),
  photo: z.any(),
  aadhaarNumber: z.string().regex(/^\d{12}$/, 'Invalid Aadhaar number'),
  residenceType: z.enum(['owned', 'rented', 'other']),
});

function App() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResidentFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ResidentFormData) => {
    setIsVerifying(true);
    try {
      const response = await verifyAadhaar(data.aadhaarNumber);
      setVerificationStatus(response);
      if (response.success) {
        // Proceed to next stage
        console.log('Form data:', data);
      }
    } catch (error) {
      setVerificationStatus({
        success: false,
        message: 'Verification failed. Please try again.',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Resident Application Form</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Full Name"
              name="fullName"
              register={register}
              error={errors.fullName?.message}
            />
            <FormInput
              label="Father's Name"
              name="fatherName"
              register={register}
              error={errors.fatherName?.message}
            />
            <FormInput
              label="Mother's Name"
              name="motherName"
              register={register}
              error={errors.motherName?.message}
            />
            <FormInput
              label="Mobile Number"
              name="mobileNumber"
              type="tel"
              register={register}
              error={errors.mobileNumber?.message}
            />
            <FormInput
              label="Email"
              name="email"
              type="email"
              register={register}
              error={errors.email?.message}
            />
            <FormInput
              label="Address"
              name="address"
              register={register}
              error={errors.address?.message}
            />
            <FormInput
              label="Block"
              name="block"
              register={register}
              error={errors.block?.message}
            />
            <FormInput
              label="PIN Code"
              name="pinCode"
              register={register}
              error={errors.pinCode?.message}
            />
            <FormInput
              label="District"
              name="district"
              register={register}
              error={errors.district?.message}
            />
            <FormInput
              label="Ward No."
              name="wardNo"
              register={register}
              error={errors.wardNo?.message}
            />
            <FormInput
              label="Police Station"
              name="policeStation"
              register={register}
              error={errors.policeStation?.message}
            />
            <FormInput
              label="Aadhaar Number"
              name="aadhaarNumber"
              register={register}
              error={errors.aadhaarNumber?.message}
            />
          </div>

          <PhotoUpload register={register} error={errors.photo?.message} />
          <ResidenceTypeSelect register={register} error={errors.residenceType?.message} />

          {verificationStatus.message && (
            <div
              className={`p-4 rounded-md ${
                verificationStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}
            >
              {verificationStatus.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isVerifying ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                Verifying...
              </>
            ) : (
              'Proceed'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;