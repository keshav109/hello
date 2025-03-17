import axios from 'axios';
import { AadhaarVerificationResponse } from '../types/form';

// This is a mock service - in production, replace with actual Aadhaar API
export const verifyAadhaar = async (aadhaarNumber: string): Promise<AadhaarVerificationResponse> => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock validation - in production, use real Aadhaar API
  if (aadhaarNumber.length === 12 && /^\d+$/.test(aadhaarNumber)) {
    return {
      success: true,
      message: 'Aadhaar verification successful'
    };
  }
  
  return {
    success: false,
    message: 'Invalid Aadhaar number'
  };
};