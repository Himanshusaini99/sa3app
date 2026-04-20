import { AgentConfig } from './types';
import { z } from 'zod';

export const AGENT_CONFIGS: AgentConfig[] = [
  {
    "id": "88818ba8-e7cf-410c-b713-15c538292cc2",
    "name": "Academic & Attendance Assistant",
    "description": "A comprehensive student success agent designed to manage university life by calculating attendance thresholds, tracking curriculum activity points, and providing guidance on leave and fee policies.",
    "triggerEvents": [
      {
        "name": "attendance_threshold_check",
        "description": "When a student's attendance in any subject falls below 75%, the agent proactively notifies the student and calculates the number of consecutive classes required to restore the percentage.",
        "type": "sync",
        "outputSchema": z.any()
      },
      {
        "name": "query_submission_analysis",
        "description": "When a student submits a new query or leave application, the agent analyzes the request type and provides immediate guidance on the likely impact on their attendance or points.",
        "type": "sync",
        "outputSchema": z.any()
      },
      {
        "name": "activity_participation_update",
        "description": "When a student registers for a smart curriculum activity, the agent calculates and displays the potential points increase and how it contributes to their overall semester goal.",
        "type": "sync",
        "outputSchema": z.any()
      }
    ],
    "config": {
      "appId": "5870316f-23ec-4648-a95d-e1aa2cae0a1f",
      "accountId": "68f5adf4-9a3d-4d6f-8a14-616f8cde6b73",
      "widgetKey": "WkjUMeOFU0zJ4ixQDhRuNeMJt3m98qxn9oWbqARx"
    }
  }
];
