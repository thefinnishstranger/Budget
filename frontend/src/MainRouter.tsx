import { Navigate, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage.tsx'
import BudgetCalculator from './pages/BudgetCalculator.tsx'
import LoginPage from './pages/LoginPage.tsx'
import AccountPage from './pages/AccountPage.tsx'
import About from './pages/About.tsx'
import SignUpPage from './pages/SignUpPage.tsx'
import ForgotPassword from './pages/ForgotPassword.tsx'

interface PrivateRouteProps {
  children: React.ReactNode;
}
const MainRouter: React.FC = () => {

  const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const token = localStorage.getItem("loggedUser");

    if (!token) {
      return <Navigate to="/login" />
    }
    return children;
  }
  return (
    <div className='min-h-screen'>
        <>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/calculator" element={<BudgetCalculator />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/account" element={<PrivateRoute><AccountPage/></PrivateRoute>} />
              <Route path="/about" element={<About />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
            </Routes>
        </>
    </div>
  )
}

export default MainRouter
