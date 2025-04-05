import { Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/login/LoginPage'
import { DashWrapper } from './components/structural/DashWrapper'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { ConfigProvider } from 'antd'
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
        </Route>
      </Routes>
    </ConfigProvider>
  )
}

export default App
