import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { FacultyDashboard } from './pages/FacultyDashboard';
import { Attendance } from './pages/Attendance';
import { Curriculum } from './pages/Curriculum';
import { Timetable } from './pages/Timetable';
import { Marks } from './pages/Marks';
import { Fees } from './pages/Fees';
import { Requests } from './pages/Requests';
import { Profile } from './pages/Profile';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const userRole = localStorage.getItem('userRole');
  return userRole ? <>{children}</> : <Navigate to="/login" />;
};

const Home = () => {
  const userRole = localStorage.getItem('userRole');
  return userRole === 'faculty' ? <FacultyDashboard /> : <Dashboard />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={
          <PrivateRoute>
            <Layout>
              <Home />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/attendance" element={
          <PrivateRoute>
            <Layout>
              <Attendance />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/curriculum" element={
          <PrivateRoute>
            <Layout>
              <Curriculum />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/timetable" element={
          <PrivateRoute>
            <Layout>
              <Timetable />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/marks" element={
          <PrivateRoute>
            <Layout>
              <Marks />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/fees" element={
          <PrivateRoute>
            <Layout>
              <Fees />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/requests" element={
          <PrivateRoute>
            <Layout>
              <Requests />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/profile" element={
          <PrivateRoute>
            <Layout>
              <Profile />
            </Layout>
          </PrivateRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
