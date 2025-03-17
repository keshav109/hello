import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserButton,useUser } from '@clerk/clerk-react';


export default function Navbar() {

  const { isSignedIn } = useUser()
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/sign-up')
  }

  return (
    <div className="bg-white shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Empty space or logo can go here if needed */}
        <div className="flex-1"></div>

        {/* Right section with search bar, notification, and admin profile */}
        <div className="flex items-center space-x-6">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="flex items-center space-x-2">
            {isSignedIn ?
              <UserButton/>
            :
              <button onClick={() => handleClick()} className="bg-indigo-700 p-2 px-3 text-white rounded-xl">
                Login
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
