import { FC } from "react"
import '../../App.css'
import { Tabs, TabsProps } from "antd";
import { GameDrawSettings } from "./components/GameDrawSettings";
import { GAME_TYPES } from "../../utils/consts";

export interface Game {
  key: React.Key;
  gameId: number;
  gameName: string;
}

export const DrawSettingsPage: FC = () => {
  
  const items: TabsProps['items'] = GAME_TYPES.map((game) => (
    {
      label: game.label,
      key: game.label,
      children: <GameDrawSettings gameType={game}/>,
    }));
  const onChange = (key: string) => {
    console.log(key);
  };

  return (
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  )
}