import { ControlOutlined, DashboardOutlined, DesktopOutlined, DollarOutlined, FileDoneOutlined, ReadOutlined, ScheduleOutlined } from "@ant-design/icons"
import { MenuProps } from "antd";

const routes: MenuProps['items'] = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '2',
      icon: <DesktopOutlined />,
      label: 'Live Trends',
    },
    {
      key: '3',
      icon: <FileDoneOutlined />,
      label: 'Results',
    },
    {
      key: '4',
      icon: <ReadOutlined />,
      label: 'Bets',
    },
    {
      key: '5',
      icon: <ScheduleOutlined />,
      label: 'Draw Settings',
    },
    {
      key: '6',
      icon: <ControlOutlined />,
      label: 'Game Configurations',
    },
    {
      key: '7',
      icon: <DollarOutlined />,
      label: 'Game Credit',
      children: [
        { key: '7.1', label: 'Load History' },
        { key: '7.2', label: 'Transfer History' },
      ],
    },
    {
      key: '8',
      icon: <ControlOutlined />,
      label: 'Account',
      children: [
        { key: '8.1', label: 'Subscribers' },
        { key: '8.2', label: 'Operators' },
      ],
    },
  ];

export const getSideMenu = () => {
    return routes;
}