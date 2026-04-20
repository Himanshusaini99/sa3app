import React, { useEffect, useState } from 'react';
import { academicService } from '@/services/academicService';
import { GraduationCap, BarChart2, TrendingUp, BookOpen, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { USERS } from '@/data/mockData';

export const Marks = () => {
  const [marks, setMarks] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [m, s] = await Promise.all([
          academicService.getMarks(),
          academicService.getSubjects()
        ]);
        setMarks(m);
        setSubjects(s);
      } catch (error) {
        console.error('Error fetching marks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getSubjectMarks = (subjectId: number) => {
    const subMarks = marks.filter(m => m.subjectId === subjectId);
    const ca = subMarks.find(m => m.type === 'CA')?.score || 0;
    const midTerm = subMarks.find(m => m.type === 'MID_TERM')?.score || 0;
    const endTerm = subMarks.find(m => m.type === 'END_TERM')?.score || 0;
    const total = ca + midTerm + endTerm;
    
    let grade = 'B';
    if (total >= 90) grade = 'O';
    else if (total >= 80) grade = 'A+';
    else if (total >= 70) grade = 'A';

    return { ca, midTerm, endTerm, total, grade };
  };

  if (loading) return <div className="p-8">Loading marks...</div>;

  const totalPossible = subjects.length * 100;
  const totalEarned = subjects.reduce((acc, sub) => acc + getSubjectMarks(sub.id).total, 0);
  const percentage = totalPossible > 0 ? Math.round((totalEarned / totalPossible) * 100) : 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Academic Performance</h1>
          <p className="text-gray-500 mt-1">Semester 5 - Progress and Examination Marks.</p>
        </div>
        <div className="bg-green-50 px-6 py-3 rounded-2xl border border-green-100 flex items-center gap-4">
          <div className="p-2 bg-green-100 text-green-600 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-green-600 uppercase tracking-wider">Current SGPA</p>
            <p className="text-2xl font-bold text-green-900">8.42</p>
          </div>
        </div>
      </div>

      {/* Marks Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">CA (20)</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Mid Term (30)</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">End Term (50)</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Total (100)</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subjects.map((subject) => {
                const { ca, midTerm, endTerm, total, grade } = getSubjectMarks(subject.id);
                return (
                  <tr key={subject.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{subject.name}</p>
                      <p className="text-xs text-gray-500">{subject.code}</p>
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-medium text-gray-700">{ca}</td>
                    <td className="px-6 py-4 text-center text-sm font-medium text-gray-700">{midTerm}</td>
                    <td className="px-6 py-4 text-center text-sm font-medium text-gray-700">{endTerm}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-sm font-bold",
                        total >= 80 ? "bg-green-50 text-green-700" :
                        total >= 60 ? "bg-blue-50 text-blue-700" :
                        "bg-orange-50 text-orange-700"
                      )}>
                        {total}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold text-gray-900">{grade}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BarChart2 className="w-6 h-6 text-blue-600" />
            Performance Insight
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Semester Progress</span>
                <span className="text-sm font-bold text-blue-600">{percentage}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${percentage}%` }}></div>
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Your performance in Computer Networks is exceptional. However, you might want to focus more on Operating Systems to improve your overall aggregate before the final exams.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-purple-600" />
            Previous Semesters
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map(sem => (
              <div key={sem} className="p-4 bg-gray-50 rounded-xl text-center">
                <p className="text-xs font-bold text-gray-500 uppercase">Sem {sem}</p>
                <p className="text-xl font-bold text-gray-900 mt-1">{8.0 + (sem * 0.2)}</p>
                <p className="text-[10px] text-green-600 font-bold">PASSED</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
