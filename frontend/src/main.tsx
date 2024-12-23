
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import MainRouter from './MainRouter.tsx'
import Footer from './components/Footer.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <MainRouter />
    <Footer />
  </BrowserRouter>,
)
