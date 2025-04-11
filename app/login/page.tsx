"use client"
import Head from 'next/head';
import Link from 'next/link';
import { useState, ChangeEvent, FormEvent } from 'react';
import { Code, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Validasi sederhana
    if (!formData.email || !formData.password) {
      setError('Email dan password harus diisi');
      return;
    }

    setLoading(true);

    // Simulasi login
    setTimeout(() => {
      console.log('Login with:', formData);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Head>
        <title>Login | Codi Platform</title>
        <meta name="description" content="Masuk ke akun Anda di Codi - Platform Belajar Pemrograman" />
      </Head>

      <div className="min-h-screen flex flex-col md:flex-row bg-gray-900">
        {/* Left side - Form */}
        <div className="flex flex-col w-full md:w-1/2 p-4 md:p-10 justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Masuk ke Akun Anda</h1>
              <p className="text-blue-400">Lanjutkan perjalanan coding-mu bersama Codi</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-gray-300">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Remember me
                </label>
                <Link href="#" className="text-blue-400 hover:text-blue-300 text-sm">
                  Lupa password?
                </Link>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300 flex items-center justify-center"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </span>
                  ) : (
                    'Login'
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Belum punya akun?{' '}
                <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-medium">
                  Daftar Sekarang
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Image/Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-gray-800 relative">
          <div className="absolute inset-0 bg-gradient-to-bl from-blue-900/40 to-gray-900/90"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
            <div className="mb-6">
              <Code className="h-28 w-28 text-blue-500" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Selamat Datang di Codi</h2>
            <p className="text-blue-300 text-lg max-w-md">
              Platform belajar pemrograman inklusif untuk semua kalangan dengan teknologi kontrol suara dan mata
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
