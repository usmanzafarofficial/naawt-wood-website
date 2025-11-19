import React, { useState } from 'react';
import { Page } from '../types';
import { authLogin, setAuthToken } from '../services/api';

interface AdminLoginProps {
  onLoginSuccess: (token: string) => void;
  navigateTo?: (page: Page) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, navigateTo }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authLogin(username, password);
      // Save token and username
      setAuthToken(response.token);
      localStorage.setItem('adminUsername', response.user?.username || username);

      // Notify parent and navigate
      onLoginSuccess(response.token);
      // update URL to /admin so App routing switches view
      if (navigateTo) {
        navigateTo('admin');
      } else {
        try { window.history.pushState({}, '', '/admin'); } catch {};
      }
    } catch (err) {
      // Show backend error message when available
      const msg = err instanceof Error ? err.message : 'Login failed. Please try again.';
      setError(msg);
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block">
            <img 
              src="/images/logofinaltrans.png" 
              alt="NAAWT Logo" 
              className="h-16 w-16 object-contain mx-auto mb-2" 
            />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Admin Panel</h1>
          <p className="text-gray-600 mt-2">NADEEM AHMED ALUMINUM & WOOD TR LLC</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={isLoading}
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-xs text-gray-600">
          <p>🔐 Secure Admin Access</p>
          <p className="mt-2">© 2025 NAAWT. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
