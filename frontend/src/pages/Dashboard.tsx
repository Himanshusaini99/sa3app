import React, { useEffect, useState } from 'react';
import { 
  Users, 
  Calendar, 
  Award, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { academicService } from '@/services/academicService';
import { authService } from '@/services/authService';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const Dashboard = () => {
  const [attendance, setAttendance] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [points, setPoints] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [att, act, userData, pts] = await Promise.all([
          academicService.getAttendance(),
          academicService.getActivities(),
          authService.getCurrentUser(),
          academicService.getPoints()
        ]);
        setAttendance(att);
        setActivities(act);
        setUser(userData.user);
        setPoints(pts.totalPoints);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !user) return <div className="p-8">Loading dashboard...</div>;

  const overallAttendance = attendance.length > 0 
    ? Math.round(attendance.reduce((acc, curr) => acc + curr.percentage, 0) / attendance.length)
    : 0;
  
  const upcomingActivities = activities.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your academics today.</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm">
          <Calendar className="w-5 h-5" />
          <span className="font-medium">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className={overallAttendance >= 75 ? "text-green-600 text-sm font-medium" : "text-red-600 text-sm font-medium"}>
              {overallAttendance >= 75 ? 'On Track' : 'Attention!'}
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Overall Attendance</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">{overallAttendance}%</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <Award className="w-6 h-6" />
            </div>
            <span className="text-purple-600 text-sm font-medium">Points Earned</span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Curriculum Points</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">{points}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Current Semester</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">Semester 5</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Activities Participated</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">{points > 0 ? Math.ceil(points / 20) : 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Low Attendance Alert */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Attendance Overview</h2>
              <Link to="/attendance" className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {attendance.slice(0, 3).map((item) => (
                <div key={item.subjectId} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold",
                      item.percentage < 75 ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                    )}>
                      {Math.round(item.percentage)}%
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{item.subjectName}</p>
                      <p className="text-xs text-gray-500">{item.present}/{item.total} Classes</p>
                    </div>
                  </div>
                  {item.percentage < 75 && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1 rounded-full">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-xs font-medium">Low Attendance</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Activities */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Available Activities</h2>
            </div>
            <div className="space-y-4">
              {upcomingActivities.map((activity) => (
                <div key={activity.id} className="p-4 border border-gray-100 rounded-xl hover:border-blue-200 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{activity.type}</span>
                    <span className="text-xs font-medium text-gray-500">{new Date(activity.date).toLocaleDateString()}</span>
                  </div>
                  <p className="font-semibold text-gray-900 mb-1">{activity.title}</p>
                  <p className="text-xs text-gray-500 line-clamp-1">{activity.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs font-bold text-green-600">+{activity.points} Points</span>
                    <Link to="/curriculum" className="text-xs font-bold text-blue-600 hover:underline">Register Now</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
