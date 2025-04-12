import { FC } from "react";
import { GAME_TYPES } from "../../utils/consts";
import { Tabs, TabsProps } from "antd";
import { LiveTrendsDetails } from "./components/LiveTrendsDetails";

export const LiveTrendsPage : FC = () => {
  const items: TabsProps['items'] = GAME_TYPES.map((game) => {
    return {
      label: game.label,
      key: game.label,
      children: <LiveTrendsDetails/>,
    }});
  const onChange = (key: string) => {
    console.log(key);
  };

  return (
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  )
}