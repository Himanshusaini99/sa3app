import React, { useEffect, useState } from 'react';
import { academicService } from '@/services/academicService';
import { Clock, MapPin, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Timetable = () => {
  const [timetable, setTimetable] = useState<any[]>([]);
  const [selectedDay, setSelectedDay] = useState('MONDAY');

  useEffect(() => {
    const fetchTimetable = async () => {
      const data = await academicService.getTimetable();
      setTimetable(data);
    };
    fetchTimetable();
  }, []);

  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];

  const filteredTimetable = timetable.filter(item => item.day === selectedDay);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Class Timetable</h1>
          <p className="text-gray-500 mt-1">Manage your weekly schedule and classes.</p>
        </div>
      </div>

      {/* Day Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4">
        {days.map(day => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={cn(
              "px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap uppercase",
              selectedDay === day 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-100" 
                : "bg-white text-gray-600 border border-gray-200 hover:border-blue-200"
            )}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule */}
      <div className="space-y-4">
        {filteredTimetable.length > 0 ? (
          filteredTimetable.map((item: any) => (
            <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center gap-6 group hover:border-blue-200 transition-colors">
              <div className="flex items-center gap-3 text-blue-600 font-bold min-w-[150px]">
                <Clock className="w-5 h-5" />
                {item.startTime} - {item.endTime}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{item.subject.name}</h3>
                <div className="flex items-center gap-6 mt-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {item.facultyName}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {item.room}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-12 rounded-2xl border border-dashed border-gray-200 text-center">
            <p className="text-gray-500">No classes scheduled for {selectedDay}.</p>
          </div>
        )}
      </div>

      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
        <h4 className="text-orange-900 font-bold mb-2">Academic Calendar Note</h4>
        <p className="text-orange-800 text-sm">
          Next Monday (April 20th) is a holiday for University Foundation Day. Classes will resume as per schedule from Tuesday.
        </p>
      </div>
    </div>
  );
};
