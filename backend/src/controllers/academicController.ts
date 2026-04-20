import { Context } from 'hono';
import * as academicService from '../services/academicService.ts';
import catchAsync from '../utils/catchAsync.ts';

export const getSubjects = catchAsync(async (c: Context) => {
  const userId = c.get('userId');
  const subjects = await academicService.getSubjects(userId);
  return c.json(subjects);
});

export const getAttendance = catchAsync(async (c: Context) => {
  const userId = c.get('userId');
  const attendance = await academicService.getAttendance(userId);
  return c.json(attendance);
});

export const getMarks = catchAsync(async (c: Context) => {
  const userId = c.get('userId');
  const marks = await academicService.getMarks(userId);
  return c.json(marks);
});

export const getTimetable = catchAsync(async (c: Context) => {
  const userId = c.get('userId');
  const timetable = await academicService.getTimetable(userId);
  return c.json(timetable);
});

export const getFees = catchAsync(async (c: Context) => {
  const userId = c.get('userId');
  const fees = await academicService.getFees(userId);
  return c.json(fees);
});
