import { FC } from "react"
import '../../App.css'
import { Tabs, TabsProps } from "antd";
import { ActiveDrawTable } from "./components/ActiveDrawTable";
import { ResultConfirmationTable } from "./components/ResultConfirmationTable";
import { ResultHistoryTable } from "./components/ResultHistoryTable";
import { WinningHistoryTable } from "./components/WinningHistoryTable";

export const DashboardPage: FC =() => {
  
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Active Draw',
      children: <ActiveDrawTable/>,
    },
    {
      key: '2',
      label: 'Result Confirmation',
      children: <ResultConfirmationTable/>,
    },
    {
      key: '3',
      label: 'Result History',
      children: <ResultHistoryTable/>,
    },
    {
      key: '4',
      label: 'Winning History',
      children: <WinningHistoryTable/>,
    },
  ];
  const onChange = (key: string) => {
    console.log(key);
  };

  return (
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  )
}