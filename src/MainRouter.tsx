import { Route, Routes } from 'react-router'
import MainPage from './pages/MainPage'
import BudgetCalculator from './pages/BudgetCalculator'
import LoginPage from './pages/LoginPage'
import AccountPage from './pages/AccountPage'
import NavBar from './components/NavBar.tsx'


const MainRouter: React.FC = () => {
  return (
    <div>
        <>
            <NavBar />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/calculator" element={<BudgetCalculator />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/account" element={<AccountPage />} />
            </Routes>
        </>
    </div>
  )
}

export default MainRouter
