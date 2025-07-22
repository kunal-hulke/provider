import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import MandapsListPage from './pages/mandap/MandapsListPage';
import BookingsPage from './pages/bookings/BookingsPage';
import CalendarPage from './pages/calendar/CalendarPage';
import PaymentsPage from './pages/payments/PaymentsPage';
import ReviewsPage from './pages/reviews/ReviewsPage';
import ProfilePage from './pages/profile/ProfilePage';
import NotificationsPage from './pages/notifications/NotificationsPage';
import VendorsPage from './pages/vendors/VendorsPage';
import CatererFormPage from './pages/vendors/CatererFormPage';
import PhotographerFormPage from './pages/vendors/PhotographerFormPage';
import RoomFormPage from './pages/vendors/RoomFormPage';

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
                    <Route path="/bookings" element={<BookingsPage />} />
                    <Route path="/calendar" element={<CalendarPage />} />
                    <Route path="/payments" element={<PaymentsPage />} />
                    <Route path="/reviews" element={<ReviewsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/vendors" element={<VendorsPage />} />
                    <Route path="/vendors/caterers/new" element={<CatererFormPage />} />
                    <Route path="/vendors/caterers/:id/edit" element={<CatererFormPage />} />
                    <Route path="/vendors/photographers/new" element={<PhotographerFormPage />} />
                    <Route path="/vendors/photographers/:id/edit" element={<PhotographerFormPage />} />
                    <Route path="/vendors/rooms/new" element={<RoomFormPage />} />
                    <Route path="/vendors/rooms/:id/edit" element={<RoomFormPage />} />
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