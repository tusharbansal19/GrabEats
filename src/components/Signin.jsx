import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser, clearError, clearSuccess, selectAuthLoading, selectAuthError, selectAuthSuccess, selectAuthMessage } from '../store/authSlice';

// Enhanced Toast component with better styling
const Toast = ({ message, type, onClose }) => (
  <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-lg shadow-2xl text-white max-w-md transform transition-all duration-300 ${
    type === 'success' 
      ? 'bg-gradient-to-r from-green-500 to-green-600 border-l-4 border-green-400' 
      : 'bg-gradient-to-r from-red-500 to-red-600 border-l-4 border-red-400'
  }`}>
    <div className="flex items-start justify-between">
      <div className="flex items-center">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
          type === 'success' ? 'bg-green-400' : 'bg-red-400'
        }`}>
          {type === 'success' ? (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <div>
          <p className="font-semibold text-sm">
            {type === 'success' ? 'Success!' : 'Error!'}
          </p>
          <p className="text-sm mt-1">{message}</p>
        </div>
      </div>
      <button 
        className="ml-4 text-lg font-bold hover:text-gray-200 transition-colors" 
        onClick={onClose}
      >
        ×
      </button>
    </div>
  </div>
);

// Simple Loader component
const Loader = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
  </div>
);

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux selectors
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const success = useSelector(selectAuthSuccess);
  const message = useSelector(selectAuthMessage);
  
  // Local state
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({ email: '', name: '', password: '', phone: '' });
  const [toast, setToast] = useState(null);
  const [serverErrors, setServerErrors] = useState({});
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;
  
  // Clear errors and success messages on component mount
  useEffect(() => {
    dispatch(clearError());
    dispatch(clearSuccess());
  }, [dispatch]);
  
  // Handle success/error messages
  useEffect(() => {
    if (success && message) {
      setToast({ message, type: 'success' });
      setTimeout(() => {
        setToast(null);
        navigate('/');
      }, 2000); // Increased timeout for better UX
    } else if (error) {
      // Handle different types of errors
      if (typeof error === 'string') {
        setToast({ message: error, type: 'error' });
      } else if (error.errors && Array.isArray(error.errors)) {
        // Handle validation errors from server
        const validationErrors = {};
        error.errors.forEach(err => {
          validationErrors[err.path || err.field] = err.msg || err.message;
        });
        setServerErrors(validationErrors);
        setToast({ message: 'Please fix the validation errors below', type: 'error' });
      } else if (error.errorType === 'DUPLICATE_KEY') {
        // Handle duplicate key errors
        setToast({ message: error.message, type: 'error' });
        if (error.field === 'email') {
          setServerErrors({ email: error.message });
        } else if (error.field === 'phone') {
          setServerErrors({ phone: error.message });
        }
      } else {
        setToast({ message: error.message || error, type: 'error' });
      }
    }
  }, [success, error, message, navigate]);
  
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
    setServerErrors({}); // Clear server errors when user starts typing
    return valid;
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setToast(null);
    setServerErrors({});
    
    if (!validateForm()) {
      return;
    }
    
    // Dispatch register action
    const result = await dispatch(registerUser({ name, email, password, phone }));
    
    // Handle the result
    if (registerUser.fulfilled.match(result)) {
      // Success is handled by useEffect above
    } else if (registerUser.rejected.match(result)) {
      // Error is handled by useEffect above
    }
  }, [name, email, password, phone, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-orange-900">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="p-6 md:p-8 lg:p-10 bg-gradient-to-br from-[#001F3F] to-[#000000] rounded-lg shadow-xl text-orange-400 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg space-y-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {loading ? (
            <div className="w-full my-20 flex justify-center items-center">
              <Loader />
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
                    setServerErrors({ ...serverErrors, name: '' });
                  }}
                  className={`w-full text-orange-400 bg-transparent border-b-2 py-2 px-4 outline-none ${
                    errors.name || serverErrors.name ? 'border-red-500' : 'border-white'
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
                {(errors.name || serverErrors.name) && (
                  <p className="text-red-500 text-sm mt-1">{errors.name || serverErrors.name}</p>
                )}
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
                    setServerErrors({ ...serverErrors, email: '' });
                  }}
                  className={`w-full text-orange-400 bg-transparent border-b-2 py-2 px-4 outline-none ${
                    errors.email || serverErrors.email ? 'border-red-500' : 'border-white'
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
                {(errors.email || serverErrors.email) && (
                  <p className="text-red-500 text-sm mt-1">{errors.email || serverErrors.email}</p>
                )}
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
                    setServerErrors({ ...serverErrors, phone: '' });
                  }}
                  className={`w-full text-orange-400 bg-transparent border-b-2 py-2 px-4 outline-none ${
                    errors.phone || serverErrors.phone ? 'border-red-500' : 'border-white'
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
                {(errors.phone || serverErrors.phone) && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone || serverErrors.phone}</p>
                )}
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
                    setServerErrors({ ...serverErrors, password: '' });
                  }}
                  className={`w-full bg-transparent text-orange-400 border-b-2 py-2 px-4 outline-none ${
                    errors.password || serverErrors.password ? 'border-red-500' : 'border-white'
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
                {(errors.password || serverErrors.password) && (
                  <p className="text-red-500 text-sm mt-1">{errors.password || serverErrors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Sign Up'}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
