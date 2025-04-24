export interface TransferHistory{
  sourceAccount: string;
  destinationAccount: string;
  amount: number;
  transactionDate: Date;
  transactedBy: string;
}