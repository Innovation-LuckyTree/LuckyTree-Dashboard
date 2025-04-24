export interface Bets {
    key: React.Key;
    gameType: string;
    drawDate: Date;
    drawSchedule: string;
    accountId: number;
    accountName: string;
    transactionNumber: string;
    combination: string;
    betStraight: number;
    betShuffle: number;
    totalBet: number;
    datePosted: Date;
    generalCoordinator: string;
    coordinator: string;
  }