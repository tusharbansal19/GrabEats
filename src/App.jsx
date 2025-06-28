import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import './App.css';
import AboutUsPage from './components/AboutUs';
import Card from './components/Card';
import ContactUsPage from './components/ContactsUs';
import UserDashboard from './components/DashBoard';
import Home from './components/Home';
import LoginPage from './components/Login';
import Menu from './components/MenuSections';
import MyCard from './components/MyCard';
import OtpPage from './components/Otp';
import SignUpPage from './components/Signin';
import { AuthProvider } from './Context/AuthContext';
import ComppProtect from './components/ProtectedRoute';
import ProtectLogin from './components/Protectroutes';
import { CartProvider } from './Context/CartProvider';
import DishShowcase from './components/ShownDish';
import Navbar from './components/navbar';
import VerifyPage from './components/VerifyPage';
import Footer from './components/Footer';

function AppContent() {
  const location = useLocation();
  // Hide header/footer on these routes
  const hideHeaderFooter = ['/login', '/signup', '/verify', '/otp'].includes(location.pathname);
  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      <Routes>
        <Route path="/signup" element={<ProtectLogin><SignUpPage /></ProtectLogin>} />
        <Route path="/login" element={<ProtectLogin><LoginPage /></ProtectLogin>} />

        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path='/dashboard' element={<ComppProtect><UserDashboard /></ComppProtect>} />
        <Route path='/contact' element={<ContactUsPage />} />
        <Route path ="/about" element={<AboutUsPage />} />
        <Route path='/cart' element={<ComppProtect><MyCard /></ComppProtect>} />
        <Route path='/card' element={<ComppProtect><Card/></ComppProtect>} />
        <Route path='/dish/*' element={<ComppProtect><DishShowcase/></ComppProtect>} />
        <Route path='/*' element={<h1>not reachable</h1>} />
      </Routes>
      {!hideHeaderFooter && <Footer scrollToTop={() => window.scrollTo({top: 0, behavior: 'smooth'})} />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
