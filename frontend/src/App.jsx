import Layout from './components/layout/Layout';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Disclaimer from './pages/Disclaimer';


const App = () => {
  return (
    <>
  <BrowserRouter>
  <Routes>
    <Route element={<Layout />}>
            <Route path="/" element={<Disclaimer />} />
            <Route path="/home" element={<HomePage />} />

    </Route>
  </Routes>
  
  </BrowserRouter>
    </>
  )
}

export default App