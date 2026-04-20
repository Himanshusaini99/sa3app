# API Specification - Smart Curriculum & Attendance App

## Authentication
- **POST /auth/register**: Register a new user (Student/Faculty)
- **POST /auth/login**: Login with email and password
- **GET /auth/me**: Get current user profile (Authenticated)

## Academic & Student Data
- **GET /academic/subjects**: Get all subjects for the current semester
- **GET /academic/attendance**: Get subject-wise attendance
- **GET /academic/marks**: Get marks for CA, Mid-term, and End-term
- **GET /academic/timetable**: Get the weekly schedule
- **GET /academic/fees**: Get fee structure and payment status

## Smart Curriculum
- **GET /activities**: List all curriculum activities
- **POST /activities/register**: Register for an activity
- **GET /activities/points**: Get total curriculum points earned

## Requests & Support
- **GET /requests**: List all leave requests and queries
- **POST /requests/leave**: Submit a leave application
- **POST /requests/query**: Submit a query
- **POST /ai/chat**: AI Chatbot for attendance and policy queries

## Faculty Endpoints
- **GET /faculty/classes**: Get classes assigned to faculty (Authenticated)
- **POST /faculty/attendance**: Mark attendance for a student (Authenticated)
- **PATCH /requests/:id**: Resolve or approve a student request (Authenticated)
