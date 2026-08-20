import Layout from './components/layout/Layout';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import {AboutPage, DisclaimerPage, ReturnPolicyPage} from './pages/LegalPages';
import NotFoundPage from './pages/NotFoundPage';


import { Provider } from 'react-redux';
import {store} from "./store/store.js";


import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage.jsx';


const App = () => {
  return (
    <>
    <Provider store={store}>

  <BrowserRouter>
  <Routes>
    <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/return-policy" element={<ReturnPolicyPage />} />


            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path="/home" element={<HomePage />} />


            <Route path="*" element={<NotFoundPage />} />

    </Route>
  </Routes>
  
  </BrowserRouter>
    </Provider>

    </>
  )
}

export default App