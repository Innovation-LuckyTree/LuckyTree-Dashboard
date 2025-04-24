export interface ResultConfirmation {
  key: React.Key;
  gameType: string;
  drawDate: Date;
  drawSchedule: string;
  cutoffStart: string;
  cutoffEnd: string;
  allowAdvanced: boolean;
  statusId: number;
  statusName: string;
  grossStraight: number;
  grossShuffle: number;
  totalGross: number;
  winningsStraight: number;
  winningsShuffle: number;
  totalWinnings: number;
  postedBy: string;
  datePosted: Date;
}