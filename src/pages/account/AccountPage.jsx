import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserCircleIcon,
  ShoppingBagIcon,
  HeartIcon,
  CogIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const AccountPage = () => {
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'January 2024'
  });
  
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'Profile Settings',
      icon: <UserCircleIcon className="h-6 w-6" />,
      description: 'Update your personal information and preferences',
      path: '/account/profile'
    },
    {
      title: 'Order History',
      icon: <ShoppingBagIcon className="h-6 w-6" />,
      description: 'View your past orders and track current orders',
      path: '/account/orders'
    },
    {
      title: 'Wishlist',
      icon: <HeartIcon className="h-6 w-6" />,
      description: 'Manage your saved items',
      path: '/wishlist'
    },
    {
      title: 'Account Settings',
      icon: <CogIcon className="h-6 w-6" />,
      description: 'Manage your account settings and preferences',
      path: '/account/settings'
    }
  ];

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Account Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
            <p className="text-gray-600">Welcome back, {user.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm text-gray-600">
          <div>
            <p>Member Since</p>
            <p className="font-medium text-gray-900">{user.joinDate}</p>
          </div>
          <div>
            <p>Email</p>
            <p className="font-medium text-gray-900">{user.email}</p>
          </div>
          <div>
            <p>Status</p>
            <p className="font-medium text-green-600">Active</p>
          </div>
        </div>
      </div>

      {/* Account Menu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {menuItems.map((item) => (
          <Link
            key={item.title}
            to={item.path}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 text-primary-600">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                <p className="mt-1 text-gray-600">{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AccountPage; 