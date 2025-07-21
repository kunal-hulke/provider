import { User, Mandap, Booking, BlockedDate, AnalyticsData, MonthlyData, Review } from '../types';
import { addDays, subDays, format } from 'date-fns';

// Current mock user/provider
export const currentUser: User = {
  id: '1',
  name: 'Raj Patel',
  email: 'raj.patel@example.com',
  phone: '9876543210',
  role: 'provider',
  createdAt: '2023-01-15T00:00:00Z',
};

// Mock mandaps
export const mandaps: Mandap[] = [
  {
    id: '1',
    name: 'Laxmi Garden',
    description: 'A beautiful venue for wedding ceremonies with lush green gardens.',
    address: '123 Wedding Lane',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    capacity: 500,
    price: 75000,
    images: [
      'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg',
      'https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg'
    ],
    amenities: ['Parking', 'AC', 'Catering', 'Decoration', 'DJ'],
    providerId: '1',
    createdAt: '2023-02-10T00:00:00Z',
    updatedAt: '2023-02-10T00:00:00Z',
  },
  {
    id: '2',
    name: 'Royal Banquet',
    description: 'An elegant indoor banquet hall perfect for grand celebrations.',
    address: '456 Celebration Road',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110001',
    capacity: 300,
    price: 60000,
    images: [
      'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg',
      'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg'
    ],
    amenities: ['Valet Parking', 'AC', 'In-house Catering', 'Stage', 'Sound System'],
    providerId: '1',
    createdAt: '2023-03-15T00:00:00Z',
    updatedAt: '2023-03-15T00:00:00Z',
  },
  {
    id: '3',
    name: 'Horizon View',
    description: 'A rooftop venue with panoramic city views.',
    address: '789 Skyline Avenue',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    capacity: 200,
    price: 45000,
    images: [
      'https://images.pexels.com/photos/2291367/pexels-photo-2291367.jpeg',
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg'
    ],
    amenities: ['Rooftop', 'Bar', 'DJ', 'Decoration', 'Catering'],
    providerId: '1',
    createdAt: '2023-04-20T00:00:00Z',
    updatedAt: '2023-04-20T00:00:00Z',
  },
];

// Mock bookings
export const bookings: Booking[] = [
  {
    id: '1',
    mandapId: '1',
    mandapName: 'Laxmi Garden',
    customerId: 'c1',
    customerName: 'Amit Shah',
    customerEmail: 'amit@example.com',
    customerPhone: '9876543210',
    startDate: format(subDays(new Date(), 10), 'yyyy-MM-dd'),
    endDate: format(subDays(new Date(), 9), 'yyyy-MM-dd'),
    totalAmount: 75000,
    status: 'completed',
    paymentStatus: 'completed',
    createdAt: format(subDays(new Date(), 20), 'yyyy-MM-dd'),
  },
  {
    id: '2',
    mandapId: '2',
    mandapName: 'Royal Banquet',
    customerId: 'c2',
    customerName: 'Priya Sharma',
    customerEmail: 'priya@example.com',
    customerPhone: '8765432109',
    startDate: format(addDays(new Date(), 5), 'yyyy-MM-dd'),
    endDate: format(addDays(new Date(), 6), 'yyyy-MM-dd'),
    totalAmount: 60000,
    status: 'confirmed',
    paymentStatus: 'partial',
    createdAt: format(subDays(new Date(), 15), 'yyyy-MM-dd'),
  },
  {
    id: '3',
    mandapId: '1',
    mandapName: 'Laxmi Garden',
    customerId: 'c3',
    customerName: 'Rahul Verma',
    customerEmail: 'rahul@example.com',
    customerPhone: '7654321098',
    startDate: format(addDays(new Date(), 15), 'yyyy-MM-dd'),
    endDate: format(addDays(new Date(), 16), 'yyyy-MM-dd'),
    totalAmount: 75000,
    status: 'confirmed',
    paymentStatus: 'pending',
    createdAt: format(subDays(new Date(), 5), 'yyyy-MM-dd'),
  },
  {
    id: '4',
    mandapId: '3',
    mandapName: 'Horizon View',
    customerId: 'c4',
    customerName: 'Neha Joshi',
    customerEmail: 'neha@example.com',
    customerPhone: '6543210987',
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    totalAmount: 45000,
    status: 'confirmed',
    paymentStatus: 'completed',
    createdAt: format(subDays(new Date(), 8), 'yyyy-MM-dd'),
  },
];

// Mock blocked dates
export const blockedDates: BlockedDate[] = [
  {
    id: '1',
    mandapId: '1',
    startDate: format(addDays(new Date(), 20), 'yyyy-MM-dd'),
    endDate: format(addDays(new Date(), 22), 'yyyy-MM-dd'),
    reason: 'Maintenance',
    createdAt: format(subDays(new Date(), 2), 'yyyy-MM-dd'),
  },
  {
    id: '2',
    mandapId: '2',
    startDate: format(addDays(new Date(), 10), 'yyyy-MM-dd'),
    endDate: format(addDays(new Date(), 12), 'yyyy-MM-dd'),
    reason: 'Renovation',
    createdAt: format(subDays(new Date(), 5), 'yyyy-MM-dd'),
  },
];

// Mock analytics data
export const analyticsData: AnalyticsData = {
  bookings: 24,
  revenue: 1650000,
  pendingBookings: 5,
  completedBookings: 19,
};

// Mock monthly data for charts
export const monthlyData: MonthlyData[] = [
  { month: 'Jan', bookings: 2, revenue: 150000 },
  { month: 'Feb', bookings: 3, revenue: 225000 },
  { month: 'Mar', bookings: 1, revenue: 60000 },
  { month: 'Apr', bookings: 4, revenue: 280000 },
  { month: 'May', bookings: 2, revenue: 120000 },
  { month: 'Jun', bookings: 5, revenue: 325000 },
  { month: 'Jul', bookings: 3, revenue: 180000 },
  { month: 'Aug', bookings: 2, revenue: 90000 },
  { month: 'Sep', bookings: 1, revenue: 45000 },
  { month: 'Oct', bookings: 0, revenue: 0 },
  { month: 'Nov', bookings: 0, revenue: 0 },
  { month: 'Dec', bookings: 1, revenue: 75000 },
];

// Add mock reviews
export const reviews: Review[] = [
  {
    id: '1',
    mandapId: '1',
    userId: 'u1',
    userName: 'Priya Sharma',
    rating: 5,
    comment: 'Beautiful venue with excellent amenities. The staff was very helpful and professional.',
    createdAt: '2024-02-15T10:30:00Z',
    images: [
      'https://images.pexels.com/photos/1114425/pexels-photo-1114425.jpeg',
      'https://images.pexels.com/photos/1114425/pexels-photo-1114425.jpeg'
    ]
  },
  {
    id: '2',
    mandapId: '1',
    userId: 'u2',
    userName: 'Rahul Verma',
    rating: 4,
    comment: 'Great location and beautiful decor. Slightly expensive but worth it.',
    createdAt: '2024-02-10T15:20:00Z'
  },
  {
    id: '3',
    mandapId: '2',
    userId: 'u3',
    userName: 'Anjali Patel',
    rating: 5,
    comment: 'Perfect venue for our wedding. The garden area is stunning!',
    createdAt: '2024-02-05T09:15:00Z',
    images: [
      'https://images.pexels.com/photos/1114425/pexels-photo-1114425.jpeg'
    ]
  }
];