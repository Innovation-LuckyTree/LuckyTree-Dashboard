import { FC } from "react";
import { GAME_TYPES } from "../../utils/consts";
import { Dropdown, MenuProps, Tabs, TabsProps } from "antd";
import { LiveTrendsDetails } from "./components/LiveTrendsDetails";
import { ReloadOutlined } from "@ant-design/icons";

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

  const refresh: MenuProps['items'] = [
    {
      label: 'Refresh',
      key: '1',
      icon: <ReloadOutlined/>
    },
  ];

  return (
    <Dropdown menu={{items:refresh}} trigger={['contextMenu']}>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </Dropdown>
  )
}