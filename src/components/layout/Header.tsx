import React from 'react';
import Image from 'next/image';
import { Search, Filter, MapPin, Bell, Star, Users, Settings, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-blue-600 font-semibold">Wealth Elite</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Header Icons */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Filter size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <MapPin size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Bell size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Star size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Users size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Settings size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <LogOut size={20} />
          </button>
          <span className="text-sm text-gray-600">LOGOUT</span>
        </div>
      </div>
    </header>
  );
};

export default Header;