import { api } from '../lib/api';
import { emitter } from '@/agentSdk';

const AGENT_ID = '88818ba8-e7cf-410c-b713-15c538292cc2';

export const academicService = {
  getSubjects: async () => {
    const response = await api.get('/academic/subjects');
    return response.data;
  },
  
  getAttendance: async () => {
    const response = await api.get('/academic/attendance');
    const attendance = response.data;
    
    const lowAttendance = attendance.filter((a: any) => a.percentage < 75);
    
    // Trigger agent for low attendance
    if (lowAttendance.length > 0) {
      await Promise.all(lowAttendance.map((a: any) => 
        emitter.emit({
          agentId: AGENT_ID,
          event: 'attendance_threshold_check',
          payload: { 
            subjectId: a.subjectId, 
            percentage: a.percentage,
            subjectName: a.subjectName
          },
          uid: localStorage.getItem('userId') || 'STU001'
        })
      ));
    }
    
    return attendance;
  },

  getActivities: async () => {
    const response = await api.get('/activities');
    return response.data;
  },

  registerForActivity: async (activityId: string) => {
    const response = await api.post('/activities/register', { activityId });
    const registration = response.data;
    
    // Trigger agent for curriculum point calculations
    await emitter.emit({
      agentId: AGENT_ID,
      event: 'activity_participation_update',
      payload: { activityId, status: 'REGISTERED' },
      uid: localStorage.getItem('userId') || 'STU001'
    });
    
    return registration;
  },

  getMarks: async () => {
    const response = await api.get('/academic/marks');
    return response.data;
  },

  getTimetable: async () => {
    const response = await api.get('/academic/timetable');
    return response.data;
  },

  getFees: async () => {
    const response = await api.get('/academic/fees');
    return response.data;
  },

  getPoints: async () => {
    const response = await api.get('/activities/points');
    return response.data;
  },

  getQueries: async () => {
    const response = await api.get('/requests');
    return response.data;
  },

  getLeaves: async () => {
    const response = await api.get('/requests');
    // Filter leaves from general requests if needed, but the API returns all requests
    return response.data.filter((r: any) => r.type === 'LEAVE');
  },

  submitQuery: async (query: { subject: string; message: string }) => {
    const response = await api.post('/requests/query', query);
    const result = response.data;
    
    await emitter.emit({
      agentId: AGENT_ID,
      event: 'query_submission_analysis',
      payload: { ...query, type: 'Query' },
      uid: localStorage.getItem('userId') || 'STU001'
    });
    return result;
  },

  submitLeave: async (leave: { reason: string; startDate: string; endDate: string }) => {
    const response = await api.post('/requests/leave', leave);
    const result = response.data;
    
    await emitter.emit({
      agentId: AGENT_ID,
      event: 'query_submission_analysis',
      payload: { ...leave, type: 'Leave' },
      uid: localStorage.getItem('userId') || 'STU001'
    });
    return result;
  }
};
