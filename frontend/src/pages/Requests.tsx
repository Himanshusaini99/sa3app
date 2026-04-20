import React, { useEffect, useState } from 'react';
import { academicService } from '@/services/academicService';
import { MessageSquare, Calendar, Plus, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Requests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'queries' | 'leaves'>('queries');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({ type: 'QUERY', subject: '', message: '', startDate: '', endDate: '' });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const data = await academicService.getQueries();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!newRequest.message || (newRequest.type === 'QUERY' && !newRequest.subject)) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      if (newRequest.type === 'QUERY') {
        await academicService.submitQuery({ subject: newRequest.subject, message: newRequest.message });
      } else {
        await academicService.submitLeave({ reason: newRequest.message, startDate: newRequest.startDate, endDate: newRequest.endDate });
      }
      alert('Request submitted successfully!');
      setIsModalOpen(false);
      setNewRequest({ type: 'QUERY', subject: '', message: '', startDate: '', endDate: '' });
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  const queries = requests.filter(r => r.type === 'QUERY');
  const leaves = requests.filter(r => r.type === 'LEAVE');

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Queries & Leave Requests</h1>
          <p className="text-gray-500 mt-1">Submit and track your applications and support tickets.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          <Plus className="w-5 h-5" />
          New Request
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('queries')}
          className={cn(
            "px-6 py-4 text-sm font-bold transition-all border-b-2",
            activeTab === 'queries' ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
          )}
        >
          Queries ({queries.length})
        </button>
        <button
          onClick={() => setActiveTab('leaves')}
          className={cn(
            "px-6 py-4 text-sm font-bold transition-all border-b-2",
            activeTab === 'leaves' ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
          )}
        >
          Leave Applications ({leaves.length})
        </button>
      </div>

      <div className="space-y-4">
        {activeTab === 'queries' ? (
          queries.map((q) => (
            <div key={q.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-blue-200 transition-all group">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-3 rounded-xl",
                  q.status === 'RESOLVED' ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
                )}>
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{q.subject}</h3>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Submitted on {new Date(q.createdAt).toLocaleDateString()}
                    </span>
                    <span>ID: {q.id}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                  q.status === 'RESOLVED' ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"
                )}>
                  {q.status}
                </span>
                <button className="text-gray-400 group-hover:text-blue-600 font-bold text-sm">View Thread</button>
              </div>
            </div>
          ))
        ) : (
          leaves.map((l) => (
            <div key={l.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-blue-200 transition-all group">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-3 rounded-xl",
                  l.status === 'APPROVED' ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"
                )}>
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{l.message}</h3>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(l.startDate).toLocaleDateString()} to {new Date(l.endDate).toLocaleDateString()}
                    </span>
                    <span>ID: {l.id}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                  l.status === 'APPROVED' ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"
                )}>
                  {l.status}
                </span>
                <button className="text-gray-400 group-hover:text-blue-600 font-bold text-sm">Details</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Info Card */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex items-start gap-4">
        <div className="p-2 bg-white text-gray-400 rounded-lg border border-gray-100 shadow-sm">
          <AlertCircle className="w-5 h-5" />
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          Need immediate help? Our <span className="font-bold text-blue-600">Academic Assistant</span> can analyze your query and provide instant guidance on how a leave application might affect your attendance thresholds.
        </p>
      </div>

      {/* New Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">New Request</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Type</label>
                <select 
                  value={newRequest.type}
                  onChange={(e) => setNewRequest({ ...newRequest, type: e.target.value })}
                  className="w-full bg-gray-50 border-gray-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="QUERY">Query</option>
                  <option value="LEAVE">Leave Application</option>
                </select>
              </div>
              {newRequest.type === 'QUERY' ? (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Subject</label>
                  <input 
                    type="text" 
                    value={newRequest.subject}
                    onChange={(e) => setNewRequest({ ...newRequest, subject: e.target.value })}
                    className="w-full bg-gray-50 border-gray-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Start Date</label>
                    <input 
                      type="date" 
                      value={newRequest.startDate}
                      onChange={(e) => setNewRequest({ ...newRequest, startDate: e.target.value })}
                      className="w-full bg-gray-50 border-gray-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">End Date</label>
                    <input 
                      type="date" 
                      value={newRequest.endDate}
                      onChange={(e) => setNewRequest({ ...newRequest, endDate: e.target.value })}
                      className="w-full bg-gray-50 border-gray-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Details / Reason</label>
                <textarea 
                  rows={4} 
                  value={newRequest.message}
                  onChange={(e) => setNewRequest({ ...newRequest, message: e.target.value })}
                  className="w-full bg-gray-50 border-gray-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div className="flex gap-4 pt-4">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-3 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
                <button 
                  onClick={handleSubmit} 
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700"
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};