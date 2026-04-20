import React, { useEffect, useState } from 'react';
import { Users, Clock, BookOpen, Search, User } from 'lucide-react';
import { authService } from '@/services/authService';
import { facultyService } from '@/services/facultyService';

export const FacultyDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, classesData] = await Promise.all([
          authService.getCurrentUser(),
          facultyService.getClasses()
        ]);
        setUser(userData.user);
        setClasses(classesData);
      } catch (error) {
        console.error('Error fetching faculty data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !user) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Faculty Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your classes and student engagement.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="text-blue-600 w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Classes Assigned</p>
          <p className="text-3xl font-bold text-blue-600">{classes.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-500 mb-1">Average Attendance</p>
          <p className="text-3xl font-bold text-green-600">82%</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-500 mb-1">Pending Requests</p>
          <p className="text-3xl font-bold text-orange-600">5</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Your Schedule</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {classes.map((cls) => (
            <div key={cls.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{cls.subject.name}</h3>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {cls.startTime} - {cls.endTime}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {cls.day}</span>
                    <span>Room: {cls.room}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => alert(`Opening attendance sheet for ${cls.subject.name}...`)}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                  Mark Attendance
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
