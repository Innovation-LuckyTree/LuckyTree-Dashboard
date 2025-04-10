import { Flex, Tabs, TabsProps } from "antd";
import { DrawSettingsDetail } from "./DrawSettingsDetail";
import { WinningLimitSettings } from "./WinningLimitSettings";
import { FC } from "react";
import { LimitCombinationTable } from "./LimitCombinationTable";
import { SoldoutCombinationTable } from "./SoldoutCombinationTable";
import { GameType } from "../../../utils/consts";

export const GameDrawSettings: FC<{gameType:GameType}> = ({gameType}) => {

  const tabs: TabsProps['items'] =[
    {
      label: 'Draw Settings',
      key: '1',
      children: <Flex gap={5}>
                  <DrawSettingsDetail/>
                  <WinningLimitSettings/>
                </Flex>,
    },
    {
      label: 'Limit/Soldout Combination',
      key: '2',
      children: <Flex gap ={5}>
                  <LimitCombinationTable digits={gameType.digits}/>
                  <SoldoutCombinationTable digits={gameType.digits}/>
                </Flex>,
    },
  ];
      
  const onChange = (key: string) => {
    console.log(key);
  };

  return (
      <Tabs defaultActiveKey="1" type="card" items={tabs} onChange={onChange} />
  );
};