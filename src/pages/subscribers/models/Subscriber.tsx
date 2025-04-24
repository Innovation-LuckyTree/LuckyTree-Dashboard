export interface Subscriber{
  accountName: string;
  mobileNumber: string;
  upline: string;
  accountType: string;
  creditBalance: number;
  gender: number | undefined;
  birthDate: Date;
  region: string;
  province: string;
  municipality: string;
  barangay: string;
  completeAddress: string;
  dateRegistered: Date;
  isBlocked: boolean;
}