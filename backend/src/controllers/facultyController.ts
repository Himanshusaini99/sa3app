import { Context } from 'hono';
import * as facultyService from '../services/facultyService.ts';
import catchAsync from '../utils/catchAsync.ts';
import ApiError from '../utils/ApiError.ts';

export const getClasses = catchAsync(async (c: Context) => {
  const userId = c.get('userId');
  const classes = await facultyService.getClasses(userId);
  return c.json(classes);
});

export const markAttendance = catchAsync(async (c: Context) => {
  const body = await c.req.json();
  const { studentId, subjectId, status } = body;

  if (!studentId || !subjectId || !status) {
    throw new ApiError(400, 'Student ID, subject ID, and status are required');
  }

  const attendance = await facultyService.markAttendance({ studentId, subjectId, status });
  return c.json(attendance, 201);
});

export const updateRequestStatus = catchAsync(async (c: Context) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const { status } = body;

  if (!status) {
    throw new ApiError(400, 'Status is required');
  }

  const request = await facultyService.updateRequestStatus(parseInt(id), status);
  return c.json(request);
});
