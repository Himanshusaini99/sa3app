import React, { useState, useEffect } from 'react';
import { User, Mail, Hash, GraduationCap, Phone } from 'lucide-react';
import { authService } from '@/services/authService';

export const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await authService.getCurrentUser();
        setUser(data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading || !user) return <div className="p-8">Loading profile...</div>;

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
        </div>
        <div className="px-12 pb-12">
          <div className="relative flex flex-col md:flex-row md:items-end gap-8 -mt-16 mb-8">
            <div className="w-40 h-40 rounded-3xl border-8 border-white bg-blue-100 flex items-center justify-center shadow-xl shadow-blue-100">
              <User className="w-20 h-20 text-blue-600" />
            </div>
            <div className="flex-1 pb-2">
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-500 font-medium">{user.role} • Semester 5</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-gray-100">
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</p>
                    <p className="text-sm font-semibold text-gray-900">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number</p>
                    <p className="text-sm font-semibold text-gray-900">Not provided</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-xl font-bold text-gray-900">Academic Details</h2>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                    <Hash className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">User ID</p>
                    <p className="text-sm font-semibold text-gray-900">{user.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Role</p>
                    <p className="text-sm font-semibold text-gray-900">{user.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
