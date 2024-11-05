import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AboutUsPage from './components/AboutUs';
import Card from './components/Card';
import ContactUsPage from './components/ContactsUs';
import UserDashboard from './components/DashBoard';
import Home from './components/Home';
import LoginPage from './components/Login';
import Menu from './components/MenuSections';
import MyCart from './components/MyCard';
import OtpPage from './components/Otp';
import SignUpPage from './components/Signin';
import { AuthProvider, useAuth } from './Context/AuthContext';
import ComppProtect from './components/ProtectedRoute';
import ProtectLogin from './components/Protectroutes';
import { CartProvider } from './Context/CartProvider';
import DishShowcase from './components/ShownDish';
import { DishProvider } from './Context/DishProvider';
import Navbar from './components/navbar';

function App() {

  return (
    
    <AuthProvider>
      <DishProvider>

      
      <CartProvider>
      <Router> {/* Changed Router to BrowserRouter */}
        
       <Navbar/>
      
        <Routes>

          
          <Route path="/signup" element={<ProtectLogin>
            
            <SignUpPage />
          </ProtectLogin>
            } />
          <Route path="/login" element={<ProtectLogin>
            
            <LoginPage />
          </ProtectLogin>
            } />
  <Route path='/otp' element={<ProtectLogin>
    
    <OtpPage />
  </ProtectLogin>
  
} />

          <Route path="/" element={<ComppProtect>
            <Home />
            </ComppProtect>
            } />
            
          <Route path="/menu" element={<ComppProtect>
            <Menu />
            </ComppProtect>
            } />
            
        
          <Route path='/dashboard' element={<ComppProtect>
            <UserDashboard />
            </ComppProtect>
            } />
            
          <Route path='/contact' element={<ComppProtect>
            <ContactUsPage />
            </ComppProtect>
            } />
            
          <Route path ="/about" element={<ComppProtect>
            <AboutUsPage />
            </ComppProtect>
            } />

          <Route path='/cart' element={<ComppProtect>
            <MyCart />
            </ComppProtect>
            } />
            

          <Route path='/card' element={<ComppProtect>
            <Card/>
            </ComppProtect>
            }/>

            
<Route path='/dish/*' element={<ComppProtect>
            <DishShowcase/>
            </ComppProtect>
            }/>
 

            

    <Route path='/*' element={
      <h1>not reachable</h1>
            } />
            





          

        </Routes>
      </Router>
      </CartProvider>
      </DishProvider>
    </AuthProvider>
  );
}

export default App;
