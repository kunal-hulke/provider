import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import MandapsListPage from './pages/mandap/MandapsListPage';
import MandapFormPage from './pages/mandap/MandapFormPage';
import BookingsPage from './pages/bookings/BookingsPage';
import PaymentsPage from './pages/payments/PaymentsPage';
import CalendarPage from './pages/calendar/CalendarPage';
import ReviewsPage from './pages/reviews/ReviewsPage';
import ProfilePage from './pages/profile/ProfilePage';
import NotificationsPage from './pages/notifications/NotificationsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/mandaps" element={<MandapsListPage />} />
            <Route path="/mandaps/new" element={<MandapFormPage />} />
            <Route path="/mandaps/edit/:id" element={<MandapFormPage />} />
            <Route path="/mandaps/:id/reviews" element={<ReviewsPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;