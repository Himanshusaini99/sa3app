import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, Users, ArrowRight, Mail, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { authService } from '@/services/authService';

export const Login = () => {
  const [role, setRole] = useState<'STUDENT' | 'FACULTY' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role || !email || !password) return;

    setLoading(true);
    setError('');
    try {
      await authService.login({ email, password, role });
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl shadow-blue-100 p-12">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-blue-200">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">EduSmart</h1>
          <p className="text-gray-500 mt-1 font-medium text-sm">University Management Reimagined</p>
        </div>

        <h2 className="text-xl font-bold text-gray-900 text-center mb-6">Welcome Back</h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setRole('STUDENT')}
              className={cn(
                "flex flex-col items-center p-4 rounded-2xl border-2 transition-all",
                role === 'STUDENT' 
                  ? "border-blue-600 bg-blue-50" 
                  : "border-gray-100 hover:border-blue-100"
              )}
            >
              <GraduationCap className={cn("w-6 h-6 mb-2", role === 'STUDENT' ? "text-blue-600" : "text-gray-400")} />
              <span className={cn("font-bold text-sm", role === 'STUDENT' ? "text-blue-700" : "text-gray-600")}>Student</span>
            </button>

            <button
              type="button"
              onClick={() => setRole('FACULTY')}
              className={cn(
                "flex flex-col items-center p-4 rounded-2xl border-2 transition-all",
                role === 'FACULTY' 
                  ? "border-blue-600 bg-blue-50" 
                  : "border-gray-100 hover:border-blue-100"
              )}
            >
              <Users className={cn("w-6 h-6 mb-2", role === 'FACULTY' ? "text-blue-600" : "text-gray-400")} />
              <span className={cn("font-bold text-sm", role === 'FACULTY' ? "text-blue-700" : "text-gray-600")}>Faculty</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="University Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-700"
                required
              />
            </div>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-700"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

          <button
            type="submit"
            disabled={!role || loading}
            className={cn(
              "w-full py-4 rounded-xl font-black text-lg transition-all flex items-center justify-center gap-3",
              role && !loading
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-200" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            {!loading && <ArrowRight className="w-6 h-6" />}
          </button>
        </form>

        <p className="text-center text-gray-400 text-xs mt-8">
          By continuing, you agree to EduSmart's Terms & Conditions.
        </p>
      </div>
    </div>
  );
};
