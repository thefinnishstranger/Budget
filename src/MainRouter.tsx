import { Nav, Navbar } from 'react-bootstrap'
import { Route, Routes } from 'react-router'
import MainPage from './pages/MainPage'
import BudgetCalculator from './pages/BudgetCalculator'
import LoginPage from './pages/LoginPage'
import AccountPage from './pages/AccountPage'
import { Link } from 'react-router-dom'


const MainRouter: React.FC = () => {
  return (
    <div>
        <>
            <Navbar expand="lg">
                <Navbar.Brand as={Link} to="/">
                  Budget
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='' />
                <Navbar.Collapse>
                    <Nav className='mr-auto'>
                        <Nav.Link as={Link} to="/" className='text-white'>Home</Nav.Link>
                        <Nav.Link as={Link} to="/calculator" className='text-white'>Budget Calculator</Nav.Link>
                        <Nav.Link as={Link} to="/login" className='text-white'>Login</Nav.Link>
                        <Nav.Link as={Link} to="/account" className='text-white'>Account</Nav.Link>
                        <Nav.Link as={Link} to="/" className='text-white'>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
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
