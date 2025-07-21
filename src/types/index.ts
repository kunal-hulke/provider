export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'provider' | 'admin';
  createdAt: string;
  avatar?: string;
  address?: string;
  city?: string;
  state?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'booking' | 'review' | 'payment' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  data?: {
    bookingId?: string;
    reviewId?: string;
    mandapId?: string;
  };
}

export interface Mandap {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  capacity: number;
  price: number;
  images: string[];
  amenities: string[];
  providerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  mandapId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  images?: string[];
}

export interface Booking {
  id: string;
  mandapId: string;
  mandapName: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'partial' | 'completed';
  createdAt: string;
}

export interface BlockedDate {
  id: string;
  mandapId: string;
  startDate: string;
  endDate: string;
  reason: string;
  createdAt: string;
}

export interface AnalyticsData {
  bookings: number;
  revenue: number;
  pendingBookings: number;
  completedBookings: number;
}

export interface MonthlyData {
  month: string;
  bookings: number;
  revenue: number;
}