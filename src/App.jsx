import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import MandapsListPage from './pages/mandap/MandapsListPage';
import MandapFormPage from './pages/mandap/MandapFormPage';
import BookingsPage from './pages/bookings/BookingsPage';
import CalendarPage from './pages/calendar/CalendarPage';
import PaymentsPage from './pages/payments/PaymentsPage';
import ReviewsPage from './pages/reviews/ReviewsPage';
import ProfilePage from './pages/profile/ProfilePage';
import NotificationsPage from './pages/notifications/NotificationsPage';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/mandaps" element={<MandapsListPage />} />
                    <Route path="/mandaps/new" element={<MandapFormPage />} />
                    <Route path="/mandaps/:id/edit" element={<MandapFormPage />} />
                    <Route path="/bookings" element={<BookingsPage />} />
                    <Route path="/calendar" element={<CalendarPage />} />
                    <Route path="/payments" element={<PaymentsPage />} />
                    <Route path="/reviews" element={<ReviewsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}