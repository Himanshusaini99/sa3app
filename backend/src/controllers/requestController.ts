import { Context } from 'hono';
import * as requestService from '../services/requestService.ts';
import catchAsync from '../utils/catchAsync.ts';
import ApiError from '../utils/ApiError.ts';

export const getRequests = catchAsync(async (c: Context) => {
  const userId = c.get('userId');
  const requests = await requestService.getRequests(userId);
  return c.json(requests);
});

export const submitLeave = catchAsync(async (c: Context) => {
  const userId = c.get('userId');
  const body = await c.req.json();
  const { reason, startDate, endDate } = body;

  if (!reason || !startDate || !endDate) {
    throw new ApiError(400, 'Reason, start date, and end date are required');
  }

  const leave = await requestService.submitLeave(userId, { reason, startDate, endDate });
  return c.json(leave, 201);
});

export const submitQuery = catchAsync(async (c: Context) => {
  const userId = c.get('userId');
  const body = await c.req.json();
  const { subject, message } = body;

  if (!subject || !message) {
    throw new ApiError(400, 'Subject and message are required');
  }

  const query = await requestService.submitQuery(userId, { subject, message });
  return c.json(query, 201);
});
