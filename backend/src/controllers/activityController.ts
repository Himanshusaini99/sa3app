import { Context } from 'hono';
import * as activityService from '../services/activityService.ts';
import catchAsync from '../utils/catchAsync.ts';
import ApiError from '../utils/ApiError.ts';

export const getActivities = catchAsync(async (c: Context) => {
  const activities = await activityService.getActivities();
  return c.json(activities);
});

export const registerForActivity = catchAsync(async (c: Context) => {
  const userId = c.get('userId');
  const body = await c.req.json();
  const { activityId } = body;

  if (!activityId) {
    throw new ApiError(400, 'Activity ID is required');
  }

  const registration = await activityService.registerForActivity(userId, parseInt(activityId));
  return c.json(registration, 201);
});

export const getPoints = catchAsync(async (c: Context) => {
  const userId = c.get('userId');
  const points = await activityService.getPoints(userId);
  return c.json(points);
});
