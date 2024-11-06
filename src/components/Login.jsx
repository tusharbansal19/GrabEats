
import React, { useCallback, useState } from 'react';
import '../css/Loader.css';
import { useAuth } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const LoginPage = () => {
  const {login}=useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: false, password: false });
  const [serverError, setServerError] = useState('');
const [loader ,setLoader]=useState(false);
const navigator = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/; 
const validateForm = () => {
  let valid = true;
  let newErrors = { email: '',  password: '',  };
  if (!emailRegex.test(email)) {
    newErrors.email = 'Please enter a valid email address';
    valid = false;
  }
  if (password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters long';
    valid = false;
  }
  setErrors(newErrors);
  setLoader(false);
  return valid;
};
const handleSubmit = useCallback(async (e) => {
  e.preventDefault();
  setServerError(''); // Reset server error
  setLoader(true); // Show loader
  if (!validateForm()) {
    setLoader(false); // Stop loader if validation fails
    return;
  }
  console.log({
    email: email,
    password: password,
  });
  localStorage.setItem("email",email);
  login();
  // try {
  //   const response = await axios.post(
  //     'https://foodappbackend-chw3.onrender.com/api/auth/register',
  //     {
  //       email: email,
  //       password: password,
  //     },
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //         api_key: "f2d9c3e5b28347763fcb57db43a24bca", // Use environment variable for API key
  //       },
  //     }
  //   );
  //   console.log(response.data);
  //   if(!response.ok){
  //     throw new Error("retry");
  //   }
  //   //  // Assume this function is defined elsewhere
  //    localStorage.setItem("token", response.data.token);
  //    localStorage.setItem("email",email);
  //    login();
  //   navigator("/"); // Navigate to the OTP page
  // } catch (error) {
  //   console.error('Error:', error);
  //   setServerError('Network error. Please try again later.'); // User feedback
  // } finally {
  //   setLoader(false); // Reset loading state
  // }
}, [email, password , navigator]); 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-orange-900">
      
      <div className="p-6 md:p-8 lg:p-10 bg-gradient-to-br from-[#001F3F] to-[#000000] rounded-lg shadow-xl text-orange-400 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg space-y-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center">Login</h2>
        {serverError &&errors.email&&errors.password&& <p className="text-red-500 text-sm text-center">{serverError}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
         {loader?<div className="w-[100%] my-20 flex justify-center items-center ">
          <div className="loader mx-auto"></div>
         </div>:
            <>
          <div className="relative ">
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: false }); // Clear email error when typing
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
            {errors.email && <p className="text-red-500 text-sm mt-1">Please enter your correct  email</p>}
          </div>
          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: false }); // Clear password error when typing
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
            {errors.password && <p className="text-red-500 text-sm mt-1">Please enter your correct password</p>}
          </div>
          <div className="">Don't have any account ? <Link  className='text-red-700 underline'
          to="/signup">SignIN</Link></div>
          {/* Submit Button */}
          <button
          type="submit" 
          className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Login
          </button>
          
      </>}
        </form>
      </div>
    </div>
  );
};
export default LoginPage;