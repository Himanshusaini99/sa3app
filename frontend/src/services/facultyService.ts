import { api } from '../lib/api';

export const facultyService = {
  getClasses: async () => {
    const response = await api.get('/faculty/classes');
    return response.data;
  },

  markAttendance: async (data: { studentId: string; subjectId: number; status: string }) => {
    const response = await api.post('/faculty/attendance', data);
    return response.data;
  },

  updateRequestStatus: async (requestId: number, status: string) => {
    const response = await api.patch(`/faculty/requests/${requestId}`, { status });
    return response.data;
  }
};
