import dayjs from "dayjs";
import { Modal } from "antd";
import { GAME_TYPES } from "./consts";
import { DrawItem } from "../shared/types/DrawItem";

export const formatLabel = (item: DrawItem) =>
  `${item.gameType}, ${dayjs(item.drawDate).format('YYYY-MM-DD (hh:mm A)')}`;


//CARD HELPER LOGICS
function rankCombination(combo: string): number[] {
  return combo
    .split("-")
    .map(card => parseInt(card));
}

export const comboSorter =(a: string, b: string): number=> {
  const combA = rankCombination(a);
  const combB = rankCombination(b);

  for (let i = 0; i < combA.length; i++) {
    if (combA[i] !== combB[i]) {
      return combA[i] - combB[i];
    }
  }
  return 0; //equal
}

export const safeNumber = (val: number | string | null): number => {
  return typeof val === 'number' ? val : 0;
};

export const intlMobileFormat = (number:string) =>{
  return "+63"+number.substring(1);
}

export const formatGender = (gender:number | undefined) =>{
  if(gender == undefined) return "";
  return gender == 1 ? "Male" : "Female";
}

export const getPercentage = (total: number, amount:number) => {
  return (amount/total) *100;
}

export const getGameType = (gameName:string) => {
  return GAME_TYPES.find((e) => e.label == gameName);
}

//// --------------------HELPER MODALS
export const cancellationModal = ( handleOkay:()=>void) => {
  Modal.confirm({
    title: 'Confirmation!',
    content: 'Are you sure you want to cancel this entry?',
    okText: "Yes",
    cancelText: "No",
    onOk: handleOkay,
    cancelButtonProps: {
      variant: 'outlined'
    },
    okButtonProps:{
      danger: true
    }
  });
}

export const updateModal = ( handleOkay:()=>void) => {
  Modal.confirm({
    title: 'Confirmation!',
    content: 'Are you sure you want to update this entry?',
    okText: "Save",
    cancelText: "No",
    onOk: handleOkay,
    cancelButtonProps: {
      variant: 'outlined'
    },
  });
}

export const deletionModal = ( handleOkay:()=>void, bodyText: string) => {
  Modal.confirm({
    title: 'Confirmation!',
    content: bodyText,
    okText: "Yes",
    cancelText:  "No",
    onOk: handleOkay,
    cancelButtonProps: {
      variant: 'outlined'
    },
    okButtonProps:{
      danger: true
    }
  });
}