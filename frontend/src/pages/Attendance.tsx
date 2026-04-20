import React, { useEffect, useState } from 'react';
import { academicService } from '@/services/academicService';
import { AlertCircle, CheckCircle2, MoreVertical, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Attendance = () => {
  const [attendance, setAttendance] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const att = await academicService.getAttendance();
      setAttendance(att);
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Tracker</h1>
          <p className="text-gray-500 mt-1">Detailed subject-wise attendance and analysis.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm">
            Download Report
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Total Classes</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Attended</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Percentage</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {attendance.map((item) => (
                <tr key={item.subjectId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{item.subjectName}</p>
                    <p className="text-xs text-gray-500">{item.subjectCode}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.total}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">{item.present}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden w-24">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            item.percentage < 75 ? "bg-red-500" : "bg-green-500"
                          )}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className={cn(
                        "text-sm font-bold",
                        item.percentage < 75 ? "text-red-600" : "text-green-600"
                      )}>{Math.round(item.percentage)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {item.percentage < 75 ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Critical
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Safe
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-400">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-start gap-4">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-blue-900 font-bold">Attendance Policy Reminder</h4>
          <p className="text-blue-800 text-sm mt-1 leading-relaxed">
            Students are required to maintain a minimum of 75% attendance in each subject to be eligible for end-term examinations. 
            Use the Academic Assistant (bottom-right chat) to calculate how many more classes you need to attend for subjects currently in "Critical" status.
          </p>
        </div>
      </div>
    </div>
  );
};
