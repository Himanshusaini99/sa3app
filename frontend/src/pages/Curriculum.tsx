import React, { useEffect, useState } from 'react';
import { academicService } from '@/services/academicService';
import { Trophy, Calendar, MapPin, Search, Plus, Filter, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { USERS } from '@/data/mockData';

export const Curriculum = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const [actData, ptsData] = await Promise.all([
        academicService.getActivities(),
        academicService.getPoints()
      ]);
      setActivities(actData);
      setPoints(ptsData.totalPoints);
    };
    fetchData();
  }, []);

  const categories = ['All', 'WORKSHOP', 'SPORT', 'COMPETITION', 'CLUB'];

  const filteredActivities = activities.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || a.type === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRegister = async (id: string) => {
    try {
      await academicService.registerForActivity(id);
      alert('Successfully registered for the activity! Our Academic Assistant will update your potential points.');
      // Refresh points
      const ptsData = await academicService.getPoints();
      setPoints(ptsData.totalPoints);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Smart Curriculum</h1>
          <p className="text-gray-500 mt-1">Participate in activities and earn reward points.</p>
        </div>
        <div className="flex items-center gap-4 bg-purple-50 px-6 py-3 rounded-2xl border border-purple-100">
          <Trophy className="w-8 h-8 text-purple-600" />
          <div>
            <p className="text-xs font-bold text-purple-600 uppercase tracking-wider">Your Points</p>
            <p className="text-2xl font-bold text-purple-900">{points}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1 w-full flex items-center gap-3 bg-white border border-gray-200 px-4 py-2.5 rounded-xl">
          <Search className="w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search activities..." 
            className="bg-transparent border-none outline-none text-sm w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                activeCategory === cat 
                  ? "bg-blue-600 text-white shadow-md shadow-blue-100" 
                  : "bg-white text-gray-600 border border-gray-200 hover:border-blue-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex items-center justify-between mb-4">
                <span className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                  activity.type === 'WORKSHOP' ? "bg-blue-50 text-blue-700" :
                  activity.type === 'COMPETITION' ? "bg-purple-50 text-purple-700" :
                  "bg-green-50 text-green-700"
                )}>
                  {activity.type}
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-green-600">
                  <Plus className="w-3 h-3" />
                  {activity.points} Points
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{activity.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">{activity.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {new Date(activity.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {activity.location}
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-gray-50 border-t border-gray-100">
              <button 
                onClick={() => handleRegister(activity.id)}
                className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
              >
                Register Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
