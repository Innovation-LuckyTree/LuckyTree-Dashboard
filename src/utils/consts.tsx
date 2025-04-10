import { DrawScheduleDetail } from "../pages/draw-settings/components/DrawSettingsDetail";

export enum GameTypesEnum{
  TWO_DIGIT = '2D',
  THREE_DIGIT = '3D',
  LAST2 = 'LAST2'
};

export interface GameType{
  value: GameTypesEnum,
  label: string,
  digits: number
}

export const GAME_TYPES = [
  {
    value: GameTypesEnum.TWO_DIGIT,
    label: '2D',
    digits: 2,
  },
  {
    value: GameTypesEnum.THREE_DIGIT,
    label: '3D',
    digits: 3,
  },
  {
    value: GameTypesEnum.LAST2,
    label: 'LAST2',
    digits: 2,
  },
]


export const DRAWSCHEDULES: DrawScheduleDetail[] = [
  {  
    drawScheduleId:1,
    drawSchedule: '02:00 PM',
    currentDraw:false,
    advanced:true,
  },
  {  
    drawScheduleId:2,
    drawSchedule: '05:00 PM',
    currentDraw:true,
    advanced:false,
  },
  {  
    drawScheduleId:3,
    drawSchedule: '09:00 PM',
    currentDraw:false,
    advanced:true,
  },
]