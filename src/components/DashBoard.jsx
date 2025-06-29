import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, selectUser } from '../store/authSlice';
import { FiUser, FiMail, FiPhone, FiLogOut, FiActivity, FiShoppingCart, FiStar } from 'react-icons/fi';
import './dashboard.css';

const UserDashboard = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  // Use Redux user data or fallback to sample data
  const userData = user || {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1-234-567-8901',
    profilePhoto: '', // URL of the profile picture, leave empty to display initials
    stats: {
      orders: 12,
      favorites: 5,
      activity: 23,
    },
    activity: [
      { icon: <FiShoppingCart />, title: 'Ordered "Spicy Pizza"', time: '2 hours ago' },
      { icon: <FiStar />, title: 'Rated "Veg Burger" 5 stars', time: '1 day ago' },
      { icon: <FiActivity />, title: 'Updated profile info', time: '3 days ago' },
    ],
  };

  // Function to display the initials if profile photo is not available
  const getInitials = (name) => {
    return name.split(' ').map((word) => word[0]).join('');
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigator('/login');
    } catch (error) {
      console.error('Logout error:', error);
      navigator('/login');
    }
  };

  return (
    <div className="dashboard-container pt-16 flex flex-col items-center justify-center relative">
      {/* Animated Fire Particles */}
      <div className="particles">
        {[...Array(9)].map((_, i) => <div className="particle" key={i} />)}
      </div>
      <div className="dashboard-card max-w-4xl w-full md:flex overflow-hidden mt-8">
        {/* Profile Section with Fire Effect */}
        <div className="profile-section md:w-1/3 p-8 flex flex-col items-center justify-center relative">
          <div className="profile-avatar mb-4">
            {userData.profilePhoto ? (
              <img src={userData.profilePhoto} alt="Profile" />
            ) : (
              <span>{getInitials(userData.name)}</span>
            )}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-1 animate-pulse">{userData.name}</h2>
          <p className="text-orange-100 text-lg mb-2 animate-fadeInUp">{userData.email}</p>
         
        </div>
        {/* User Info Section */}
        <div className="md:w-2/3 p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 animate-fadeInUp">User Information</h3>
            <div className="user-info-section">
              <div className="info-item">
                <span className="info-label"><FiUser /> Name:</span>
                <span className="info-value">{userData.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label"><FiMail /> Email:</span>
                <span className="info-value">{userData.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label"><FiPhone /> Phone:</span>
                <span className="info-value">{userData.phone}</span>
              </div>
            </div>
            {/* Recent Activity Section */}
            <div className="activity-section mt-6">
              <h4 className="text-xl font-bold text-white mb-4">Recent Activity</h4>
              {userData.activity?.length ? userData.activity.map((act, idx) => (
                <div className="activity-item" key={idx}>
                  <div className="activity-icon">{act.icon}</div>
                  <div className="activity-content">
                    <div className="activity-title">{act.title}</div>
                    <div className="activity-time">{act.time}</div>
                  </div>
                </div>
              )) : <div className="text-gray-300">No recent activity.</div>}
            </div>
          </div>
          {/* Action Buttons */}
          <div className="action-buttons mt-8">
            <button
              onClick={handleLogout}
              className="action-btn btn-danger"
            >
              <FiLogOut /> Logout
            </button>
            <a href="#" className="action-btn btn-secondary">
              <FiUser /> Edit Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
