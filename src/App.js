import Layout from './components/layouts/Layout';
import Home from './components/pages/Home';
import SignIn from './components/pages/SignIn';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContactUs from './components/pages/ContactUs';
import PageNotFound from './components/pages/404';

import './App.css';

// 1:20:56

function App() {
  return (
    <BrowserRouter>
    <Layout>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/contact' element={<ContactUs />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
    </Layout>
    </BrowserRouter>
  );
}

export default App;