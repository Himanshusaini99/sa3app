# Application Plan - Smart Curriculum & Attendance App

## Overview
A comprehensive university management platform for students and faculty, focusing on attendance tracking, smart curriculum participation, academic performance, and automated support.

## Core Features

### 1. Authentication & Role-Based Access
- [x] Role selection (Student/Faculty) on login.
- [x] Mock authentication with local storage.
- [x] Personalized dashboards based on user role.

### 2. Student Features
- [x] **Dashboard**: Overview of attendance, upcoming classes, and curriculum points.
- [x] **Attendance**: Detailed subject-wise attendance with percentage and threshold alerts.
- [x] **Smart Curriculum**: Browse activities (workshops, sports, clubs), register, and track points earned.
- [x] **Academic Performance**: Semester-wise marks (CA, Mid-term, End-term) and current semester progress.
- [x] **Timetable**: Weekly schedule with room numbers and faculty names.
- [x] **Finance**: Fee structure, payment history, and pending dues.
- [x] **Requests**: Leave applications and general queries with status tracking.
- [x] **AI Chatbot**: Real-time assistance for attendance and policy queries.

### 3. Faculty Features
- [ ] **Class Management**: View assigned classes and student lists.
- [ ] **Attendance Marking**: Tool to mark daily attendance.
- [ ] **Query Resolution**: View and respond to student queries/leave requests.

### 4. Agent Integrations
- [x] `attendance_threshold_check`: Sync event for low attendance alerts.
- [x] `query_submission_analysis`: Sync event for query/leave impact analysis.
- [x] `activity_participation_update`: Sync event for curriculum point calculations.

## Implementation Roadmap

### Phase 1: Foundation
- [ ] Setup project structure and styles (Tailwind v4).
- [ ] Create mock data for all modules.
- [ ] Implement core layout (Sidebar, Navbar).

### Phase 2: Core Student Modules
- [ ] Dashboard & Attendance view.
- [ ] Smart Curriculum & Points tracking.
- [ ] Academic Marks & Timetable.

### Phase 3: Communication & Support
- [ ] Leave/Query application system.
- [ ] AI Chatbot integration (WebSocket).
- [ ] Finance & Profile sections.

### Phase 4: Faculty & Polish
- [ ] Faculty-specific views.
- [ ] Final UI/UX refinements.
- [ ] Build and verification.
