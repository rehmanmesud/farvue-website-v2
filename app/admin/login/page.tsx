'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, User, AlertCircle } from 'lucide-react';

interface LoginCredentials {
  username: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Demo credentials (in production, this would be handled by a backend)
  const validCredentials = [
    { username: 'admin', password: 'admin123', role: 'Admin' },
    { username: 'rehmanmesud', password: 'farvue2024', role: 'Admin' },
    { username: 'editor', password: 'editor123', role: 'Editor' },
    { username: 'designer', password: 'design123', role: 'Designer' },
    { username: 'viewer', password: 'view123', role: 'Viewer' }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    setTimeout(() => {
      const user = validCredentials.find(
        cred => cred.username === credentials.username && cred.password === credentials.password
      );

      if (user) {
        // Store user session (in production, use proper JWT tokens)
        localStorage.setItem('adminUser', JSON.stringify({
          username: user.username,
          role: user.role,
          loginTime: new Date().toISOString()
        }));
        
        // Redirect to admin dashboard
        router.push('/admin');
      } else {
        setError('Invalid username or password');
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-secondary-500 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-accent-500 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">F</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">FARVUE Media</h1>
          <p className="text-gray-400">Admin Panel Access</p>
        </div>

        {/* Login Form */}
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-8 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Sign In</h2>
            <p className="text-gray-400">Enter your credentials to access the admin panel</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  required
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-dark-900 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 bg-dark-900 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent-500 hover:bg-accent-600 text-white py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg shadow-accent-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-dark-900 border border-dark-600 rounded-lg">
            <h3 className="text-white font-medium mb-3">Demo Credentials:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Admin:</span>
                <span className="text-white">admin / admin123</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Owner:</span>
                <span className="text-white">rehmanmesud / farvue2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Editor:</span>
                <span className="text-white">editor / editor123</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Designer:</span>
                <span className="text-white">designer / design123</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Viewer:</span>
                <span className="text-white">viewer / view123</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a 
              href="/"
              className="text-accent-400 hover:text-accent-300 text-sm transition-colors duration-200"
            >
              ← Back to Website
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            © 2024 FARVUE Media. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}