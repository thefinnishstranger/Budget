import { Route, Routes } from 'react-router'
import MainPage from './pages/MainPage'
import BudgetCalculator from './pages/BudgetCalculator'
import LoginPage from './pages/LoginPage'
import AccountPage from './pages/AccountPage'
import NavBar from './components/NavBar.tsx'
import About from './pages/About.tsx'
import SignUpPage from './pages/SignUpPage.tsx'


const MainRouter: React.FC = () => {
  return (
    <div className='min-h-screen'>
        <>
            <NavBar />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/calculator" element={<BudgetCalculator />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/about" element={<About />} />
            </Routes>
        </>
    </div>
  )
}

export default MainRouter
