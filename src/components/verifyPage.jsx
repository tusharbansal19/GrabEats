import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Loader Component
const Loader = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
  </div>
);

const VerifyPage = ({ onEmailSubmit }) => {
  const [email, setEmail] = useState('');
  const navigator = useNavigate();
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setError('');
    setLoader(true);

    if (!validateEmail()) {
      setError('Please enter a valid email address');
      setLoader(false);
      return;
    }

    try {
      // Send email to the server for verification
      await axios.post(
        'https://foodappbackend-chw3.onrender.com/api/eVerify/send-otp',
        { email: email },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            api_key: 'f2d9c3e5b28347763fcb57db43a24bca',
          },
        }
      );
      // onEmailSubmit(email);
navigator("/otp",{state:{email,}});
       // Call the function passed down to handle successful submission
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('An error occurred while sending the OTP. Please try again.');
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-orange-900">
      <div className="p-6 md:p-8 lg:p-10 bg-gradient-to-br from-[#001F3F] to-[#000000] rounded-lg shadow-xl text-orange-400 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg space-y-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center">Verify Your Email</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {loader ? (
            <div className="w-full my-20 flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              {/* Email Input */}
              <div className="relative">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full text-orange-400 bg-transparent border-b-2 py-2 px-4 outline-none ${
                    error ? 'border-red-500' : 'border-white'
                  } focus:border-orange-300 transition-all duration-300`}
                  required
                />
                <label
                  className={`absolute left-4 top-0 text-white pointer-events-none transition-all duration-300 ${
                    email ? 'text-xs -top-4' : 'text-lg top-2'
                  }`}
                >
                  Email
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Send Verification Email
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyPage;