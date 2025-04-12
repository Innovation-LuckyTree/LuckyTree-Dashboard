import { Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/login/LoginPage'
import { DashWrapper } from './components/structural/DashWrapper'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { ConfigProvider } from 'antd'
import { BetsPage } from './pages/bets/BetsPage'
import { DrawSettingsPage } from './pages/draw-settings/DrawSettingsPage'
import '@ant-design/v5-patch-for-react-19';
import { GameConfigurationsPage } from './pages/game-configurations/GameConfigurationsPage'
import { LoadHistoryPage } from './pages/load-history/LoadHistoryPage'
import { TransferHistoryPage } from './pages/transfer-history/TransferHistoryPage'
import { SubscribersPage } from './pages/subscribers/SubscribersPage'
import { OperatorsPage } from './pages/operators/OperatorsPage'
function App() {

  return (
    <ConfigProvider
      theme={{
        token: {
          // colorPrimary: '#00b96b',

          // colorBgContainer: '#f6ffed',
        },
        components: {
          Layout: {
            // headerColor: '#ffffff', // Text color in header
            
          },
          Dropdown:{
            colorText: "black",
          }
        },
      }}
    >
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="/" element={<DashWrapper />}>
          <Route path="/" element={<DashboardPage />}/>
          <Route path="/results" element={<DashboardPage />}/>
          <Route path="/bets" element={<BetsPage />}/>
          <Route path="/draw-settings" element={<DrawSettingsPage />}/>
          <Route path="/game-config" element={<GameConfigurationsPage />}/>
          <Route path="/game-credit/load-history" element={<LoadHistoryPage />}/>
          <Route path="/game-credit/transfer-history" element={<TransferHistoryPage />}/>
          <Route path="/account/subscribers" element={<SubscribersPage />}/>
          <Route path="/account/operators" element={<OperatorsPage />}/>
        </Route>
      </Routes>
    </ConfigProvider>
  )
}

export default App
