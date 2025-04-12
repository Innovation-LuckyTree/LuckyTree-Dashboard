import { Tabs, TabsProps } from "antd";
import { FC } from "react";
import { GAME_TYPES, GameType } from "../../utils/consts";
import { DrawSchedulesTable } from "./components/DrawSchedulesTable";
import { AppSettings } from "./components/AppSettings";

export const GameConfigurationsPage: FC = () => {
  
  const onChange = (key: string) => {
    console.log(key);
  };

  const gameTabs: (gameType:GameType)=>TabsProps['items'] = (gameType) => ([
    {
      label: 'Draw Schedules',
      key: '1',
      children: <DrawSchedulesTable />,
    },
    {
      label: 'App Settings',
      key: '2',
      children: <AppSettings game={gameType}/>,
    },
  ]);

  const items: TabsProps['items'] = GAME_TYPES.map((game) => {
    return {
      label: game.label,
      key: game.label,
      children: <Tabs defaultActiveKey="1"  type="card" items={gameTabs(game)} onChange={onChange} />,
    }});


  return (
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  )
}