export interface WinningHistory {
  key: React.Key;
  gameType: string;
  drawDate: Date;
  drawSchedule: string;
  accountId: number;
  accountName: string;
  transactionNumber: string;
  combination: string;
  result: string;
  betStraight: number;
  betShuffle: number;
  totalBet: number;
  winStraight: number;
  winShuffle: number;
  datePosted: Date;
  generalCoordinator: string;
  coordinator: string;
}