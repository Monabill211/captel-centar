export type OrderStatus = "pending" | "confirmed" | "delivered" | "cancelled";
export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type Book = {
  id: number;
  name: string;
  subject: string;
  image: string;
  description: string;
  price: number;
  author: string;
  stage: string[];
};

export type Teacher = {
  id: number;
  name: string;
  subject: string;
  image: string;
  bio: string;
  students: string;
  experience: string;
  rating: number;
  stages: string[];
};

export type Blog = {
  id: number;
  image: string;
  tag: string;
  title: string;
  excerpt: string;
  content: string;
};

export type BookOrder = {
  id: string;
  bookId: number;
  bookTitle: string;
  studentName: string;
  studentPhone: string;
  parentName: string;
  parentPhone: string;
  address: string;
  paymentMethod: string;
  paymentNumber: string;
  status: OrderStatus;
  createdAt: string;
};

export type TeacherBooking = {
  id: string;
  teacherId: number;
  teacherName: string;
  studentName: string;
  studentPhone: string;
  stage: string;
  parentName: string;
  parentPhone: string;
  preferredTime: string;
  notes: string;
  status: BookingStatus;
  createdAt: string;
};

export type CenterData = {
  books: Book[];
  teachers: Teacher[];
  blogs: Blog[];
  bookOrders: BookOrder[];
  teacherBookings: TeacherBooking[];
};
