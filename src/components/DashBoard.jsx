import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const UserDashboard = () => {

  const navigator =useNavigate();
  const {logout} = useAuth();
  // Sample user data (replace this with your actual data source)
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1-234-567-8901',
    profilePhoto: '', // URL of the profile picture, leave empty to display initials
  };

  // Function to display the initials if profile photo is not available
  const getInitials = (name) => {
    return name.split(' ').map((word) => word[0]).join('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black flex justify-center items-center p-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden md:flex">
        {/* Profile Section */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 md:w-1/3 p-8 flex flex-col items-center justify-center">
          <div className="w-40 h-40 rounded-full overflow-hidden bg-white flex items-center justify-center text-5xl text-orange-600 font-bold">
            {user.profilePhoto ? (
              <img src={user.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span>{getInitials(user.name)}</span>
            )}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-4">{user.name}</h2>
          <p className="text-orange-200 text-lg">{user.email}</p>
        </div>

        {/* User Info Section */}
        <div className="md:w-2/3 p-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">User Information</h3>
          <div className="space-y-4">
            {/* Name */}
            <div className="flex items-center">
              <span className="font-bold text-gray-700 text-lg w-32">Name:</span>
              <span className="text-gray-900 text-lg">{user.name}</span>
            </div>

            {/* Email */}
            <div className="flex items-center">
              <span className="font-bold text-gray-700 text-lg w-32">Email:</span>
              <span className="text-gray-900 text-lg">{user.email}</span>
            </div>

            {/* Phone */}
            <div className="flex items-center">
              <span className="font-bold text-gray-700 text-lg w-32">Phone:</span>
              <span className="text-gray-900 text-lg">{user.phone}</span>
            </div>

            {/* More User Details */}
            {/* You can add more fields here as per your requirements */}
          </div>

          {/* Logout Button */}
          <div className="mt-6">
            <button
              onClick={() =>{
                logout();
                navigator('/login');
              }}
              className="py-2 px-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
