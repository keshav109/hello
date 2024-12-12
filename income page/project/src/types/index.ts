export interface Address {
  doorNumber: string;
  district: string;
  block: string;
  village: string;
  secretariat: string;
  pinCode: string;
}

export interface IncomeDetails {
  landIncome: number;
  businessIncome: number;
  buildingIncome: number;
  laborIncome: number;
  salaryIncome: number;
  otherIncome: number;
}

export interface DocumentStatus {
  aadharCard: boolean;
  photo: boolean;
  itReturns: boolean;
  paySlips: boolean;
}

export interface FormData {
  applicationType: 'self' | 'parent';
  applicantName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  rationCardNumber: string;
  aadharNumber: string;
  guardianType?: 'mother' | 'father' | 'guardian';
  guardianRelation?: string;
  address: Address;
  //name of guardian:string;
  incomeDetails: IncomeDetails;
  documents: {
    aadharCard?: File;
    photo?: File;
    itReturns?: File;
    paySlips?: File;
  };
}