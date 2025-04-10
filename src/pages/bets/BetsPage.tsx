import { FC } from "react"
import '../../App.css'
import { Tabs, TabsProps } from "antd";
import { ActiveBetsTable } from "./components/ActiveBetsTable";
import { BetsHistory } from "./components/BetsHistoryTable";

export const BetsPage: FC =() => {
  
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Active Bets',
      children: <ActiveBetsTable/>,
    },
    {
      key: '2',
      label: 'Bets History',
      children:<BetsHistory/>,
    }
  ];
  const onChange = (key: string) => {
    console.log(key);
  };

  return (
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  )
}