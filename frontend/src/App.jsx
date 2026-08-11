import Layout from './components/layout/Layout';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';


const App = () => {
  return (
    <>
  <BrowserRouter>
  <Routes>
    <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />

    </Route>
  </Routes>
  
  </BrowserRouter>
    </>
  )
}

export default App