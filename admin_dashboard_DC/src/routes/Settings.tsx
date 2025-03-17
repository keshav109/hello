import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';

export default function Settings() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="shadow-sm max-w-md mx-auto mt-8">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {isLogin ? 'Login' : 'Create Account'}
          </h2>
        </div>

        <div className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="John Doe"
                />
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 relative">
              <input
                type="email"
                className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="you@example.com"
              />
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 relative">
              <input
                type="password"
                className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
              />
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <button className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>

          <div className="text-center mt-4">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}