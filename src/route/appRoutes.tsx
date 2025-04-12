import { ControlOutlined, DashboardOutlined, DesktopOutlined, DollarOutlined, FileDoneOutlined, ReadOutlined, ScheduleOutlined } from "@ant-design/icons"
import { MenuProps } from "antd";
import { Link } from "react-router-dom";

const routes: MenuProps['items'] = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: <Link to='/'>Dashboard</Link>,
    },
    {
      key: '/live-trends',
      icon: <DesktopOutlined />,
      label: 'Live Trends',
    },
    {
      key: '/results',
      icon: <FileDoneOutlined />,
      label: <Link to='/results'>Results</Link>,
    },
    {
      key: '/bets',
      icon: <ReadOutlined />,
      label: <Link to='/bets'>Bets</Link>,
    },
    {
      key: '/draw-settings',
      icon: <ScheduleOutlined />,
      label: <Link to='draw-settings'>Draw Settings</Link>,
    },
    {
      key: '/game-config',
      icon: <ControlOutlined />,
      label: <Link to='game-config'>Game Configurations</Link>,
    },
    {
      key: '/game-credit/load',
      icon: <DollarOutlined />,
      label: 'Game Credit',
      children: [
        { key: '/game-credit/load-history', label: 'Load History' },
        { key: '/game-credit/transfer-history', label: 'Transfer History' },
      ],
    },
    {
      key: '/account',
      icon: <ControlOutlined />,
      label: 'Account',
      children: [
        { key: '/account/subscribers', label: 'Subscribers' },
        { key: '/account/operators', label: 'Operators' },
      ],
    },
  ];

export const getSideMenu = () => {
    return routes;
}