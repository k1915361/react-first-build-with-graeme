import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout.js';
import Home from './components/pages/Home.js';
import UsersPage from './components/pages/UsersPage.js';
import SignIn from './components/pages/SignIn.js';
import SignUpPage from './components/pages/SignUpPage.js';
import ContactUs from './components/pages/ContactUs.js';
import PageNotFound from './components/pages/404.js';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Layout>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/users' element={<UsersPage />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/contact' element={<ContactUs />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
    </Layout>
    </BrowserRouter>
  );
}

export default App;