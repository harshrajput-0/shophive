import Layout from './components/layout/Layout';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import {AboutPage, DisclaimerPage, ReturnPolicyPage} from './pages/LegalPages';
import NotFoundPage from './pages/NotFoundPage';


const App = () => {
  return (
    <>
  <BrowserRouter>
  <Routes>
    <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/return-policy" element={<ReturnPolicyPage />} />
            <Route path="/home" element={<HomePage />} />


            <Route path="*" element={<NotFoundPage />} />

    </Route>
  </Routes>
  
  </BrowserRouter>
    </>
  )
}

export default App