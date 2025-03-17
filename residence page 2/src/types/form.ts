export interface ResidentFormData {
  fullName: string;
  fatherName: string;
  motherName: string;
  mobileNumber: string;
  email: string;
  address: string;
  block: string;
  pinCode: string;
  district: string;
  wardNo: string;
  policeStation: string;
  photo: File | null;
  aadhaarNumber: string;
  residenceType: 'owned' | 'rented' | 'other';
}

export interface AadhaarVerificationResponse {
  success: boolean;
  message: string;
}