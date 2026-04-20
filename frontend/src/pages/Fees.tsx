import React, { useEffect, useState } from 'react';
import { academicService } from '@/services/academicService';
import { Wallet, CreditCard, Clock, Download, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Fees = () => {
  const [fees, setFees] = useState<any[]>([]);

  useEffect(() => {
    const fetchFees = async () => {
      const data = await academicService.getFees();
      setFees(data);
    };
    fetchFees();
  }, []);

  const totalFee = fees.reduce((sum, f) => sum + f.amount, 0);
  const paidFee = fees.filter(f => f.status === 'PAID').reduce((sum, f) => sum + f.amount, 0);
  const pendingFee = totalFee - paidFee;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Overview</h1>
          <p className="text-gray-500 mt-1">Manage your university fees and payment history.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
          <CreditCard className="w-5 h-5" />
          Pay Pending Fees
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Semester Fee</p>
          <p className="text-3xl font-bold text-gray-900">₹{totalFee.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-500 mb-1">Paid Amount</p>
          <p className="text-3xl font-bold text-green-600">₹{paidFee.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-sm font-medium text-gray-500 mb-1">Pending Dues</p>
            <p className="text-3xl font-bold text-red-600">₹{pendingFee.toLocaleString()}</p>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <AlertCircle className="w-16 h-16 text-red-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Payment History</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {fees.map((item: any) => (
              <div key={item.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-3 rounded-xl",
                    item.status === 'PAID' ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
                  )}>
                    {item.status === 'PAID' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500">ID: FEE-{item.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">₹{item.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Due: {new Date(item.dueDate).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
