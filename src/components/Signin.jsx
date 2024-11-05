import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Loader.css';

import { useAuth } from '../Context/AuthContext';

const SignUpPage = () => {
  const {login}=useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({ email: '', name: '', password: '', phone: '' });
  const [serverError, setServerError] = useState('');
  const [loader, setLoader] = useState(false);
  const navigator = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/; // Example validation for a 10-digit phone number
  const validateForm = () => {
    let valid = true;
    let newErrors = { email: '', name: '', password: '', phone: '' };

    if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    if (!name) {
      newErrors.name = 'Please enter your name';
      valid = false;
    }

    if (!phoneRegex.test(phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
      valid = false;
    }

    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  
const HandleSubmit = useCallback(async (e) => {
  e.preventDefault();
  setServerError(''); // Reset server error
  setLoader(true); // Show loader

  if (!validateForm()) {
    setLoader(false); // Stop loader if validation fails
    return;
  }

  console.log({
    name: name,
    email: email,
    password: password,
    phone: phone,
  });

  try {
    // Make a POST request to the API
    const response = await axios.post(
      'https://foodappbackend-chw3.onrender.com/api/auth/register',
      {
        name: name,
        email: email,
        password: password,
        phone: phone,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          api_key: "f2d9c3e5b28347763fcb57db43a24bca", // Use environment variable for API key
        },
      }
    );

    console.log(response.data);
    //  // Assume this function is defined elsewhere
    localStorage.setItem('token', response.data.token);
     otpFunction();
    // navigator("/otp"); // Navigate to the OTP page

  } catch (error) {
    console.error(
      'Error registering:',
    error.response.data.msg 
    );
    // console.error('Error:', error);
    setServerError(error.response.data.msg);
    setLoader(false); // User feedback

  } finally {
  // Reset loading state
  }
}, [name, email, password, phone, setServerError,  navigator]);







const otpFunction=async ()=>{
  
  let responseOtp;
  // console.log("Data to otp");
 
  try{
        responseOtp = await axios.post(
          'https://foodappbackend-chw3.onrender.com/api/eVerify/send-otp',
          {
            
            "email": email,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              api_key: 'f2d9c3e5b28347763fcb57db43a24bca',
            },
          }
        );
        
        
        if (!responseOtp.ok) {
          setServerError( 'An error occurred. Please try again.');}
          
          navigator("/otp",{ state: email });
          
          
          
        }
            catch(err) {
              console.error('Error:', err);
              setServerError('Network error. Please try again later.');
      
            }
            finally{
              setLoader(false)
              // setLoader(false)
            }
}




  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-orange-900">
      <div className="p-6 md:p-8 lg:p-10 bg-gradient-to-br from-[#001F3F] to-[#000000] rounded-lg shadow-xl text-orange-400 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg space-y-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center">Sign Up</h2>
        {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}
        <form onSubmit={HandleSubmit} className="space-y-6">
          {loader ? (
            <div className="w-full my-20 flex justify-center items-center">
              <div className="loader mx-auto"></div>
            </div>
          ) : (
            <>
              {/* Name Input */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors({ ...errors, name: '' });
                  }}
                  className={`w-full text-orange-400 bg-transparent border-b-2 py-2 px-4 outline-none ${
                    errors.name ? 'border-red-500' : 'border-white'
                  } focus:border-orange-300 transition-all duration-300`}
                  required
                />
                <label
                  htmlFor="name"
                  className={`absolute left-4 top-0 text-white pointer-events-none transition-all duration-300 ${
                    name ? 'text-xs -top-4' : 'text-lg top-2 focus:text-orange-400'
                  }`}
                >
                  Name
                </label>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email Input */}
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({ ...errors, email: '' });
                  }}
                  className={`w-full text-orange-400 bg-transparent border-b-2 py-2 px-4 outline-none ${
                    errors.email ? 'border-red-500' : 'border-white'
                  } focus:border-orange-300 transition-all duration-300`}
                  required
                />
                <label
                  htmlFor="email"
                  className={`absolute left-4 top-0 text-white pointer-events-none transition-all duration-300 ${
                    email ? 'text-xs -top-4' : 'text-lg top-2 focus:text-orange-400'
                  }`}
                >
                  Email
                </label>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Phone Input */}
              <div className="relative">
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setErrors({ ...errors, phone: '' });
                  }}
                  className={`w-full text-orange-400 bg-transparent border-b-2 py-2 px-4 outline-none ${
                    errors.phone ? 'border-red-500' : 'border-white'
                  } focus:border-orange-300 transition-all duration-300`}
                  required
                />
                <label
                  htmlFor="phone"
                  className={`absolute left-4 top-0 text-white pointer-events-none transition-all duration-300 ${
                    phone ? 'text-xs -top-4' : 'text-lg top-2'
                  }`}
                >
                  Phone
                </label>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors({ ...errors, password: '' });
                  }}
                  className={`w-full bg-transparent text-orange-400 border-b-2 py-2 px-4 outline-none ${
                    errors.password ? 'border-red-500' : 'border-white'
                  } focus:border-orange-300 transition-all duration-300`}
                  required
                />
                <label
                  htmlFor="password"
                  className={`absolute left-4 top-0 text-white pointer-events-none transition-all duration-300 ${
                    password ? 'text-xs -top-4' : 'text-lg top-2'
                  }`}
                >
                  Password
                </label>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Sign Up
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
