import { defaultCenterData } from "./defaults";
import type {
  Blog,
  Book,
  BookOrder,
  CenterData,
  Teacher,
  TeacherBooking,
} from "./types";

const STORAGE_KEY = "capital-center-data";

export const STORE_EVENT = "capital-center-update";

function isBrowser() {
  return typeof window !== "undefined";
}

export function loadCenterData(): CenterData {
  if (!isBrowser()) return defaultCenterData;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultCenterData };
    const parsed = JSON.parse(raw) as CenterData;
    return {
      books: parsed.books?.length ? parsed.books : defaultCenterData.books,
      teachers: parsed.teachers?.length
        ? parsed.teachers
        : defaultCenterData.teachers,
      blogs: parsed.blogs?.length ? parsed.blogs : defaultCenterData.blogs,
      bookOrders: parsed.bookOrders ?? [],
      teacherBookings: parsed.teacherBookings ?? [],
    };
  } catch {
    return { ...defaultCenterData };
  }
}

export function saveCenterData(data: CenterData) {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent(STORE_EVENT));
}

export function nextId<T extends { id: number }>(items: T[]) {
  return items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;
}

export function addBook(book: Omit<Book, "id">) {
  const data = loadCenterData();
  const item: Book = { ...book, id: nextId(data.books) };
  saveCenterData({ ...data, books: [...data.books, item] });
  return item;
}

export function updateBook(id: number, patch: Partial<Book>) {
  const data = loadCenterData();
  saveCenterData({
    ...data,
    books: data.books.map((b) => (b.id === id ? { ...b, ...patch } : b)),
  });
}

export function deleteBook(id: number) {
  const data = loadCenterData();
  saveCenterData({ ...data, books: data.books.filter((b) => b.id !== id) });
}

export function addTeacher(teacher: Omit<Teacher, "id">) {
  const data = loadCenterData();
  const item: Teacher = { ...teacher, id: nextId(data.teachers) };
  saveCenterData({ ...data, teachers: [...data.teachers, item] });
  return item;
}

export function updateTeacher(id: number, patch: Partial<Teacher>) {
  const data = loadCenterData();
  saveCenterData({
    ...data,
    teachers: data.teachers.map((t) =>
      t.id === id ? { ...t, ...patch } : t
    ),
  });
}

export function deleteTeacher(id: number) {
  const data = loadCenterData();
  saveCenterData({
    ...data,
    teachers: data.teachers.filter((t) => t.id !== id),
  });
}

export function addBlog(blog: Omit<Blog, "id">) {
  const data = loadCenterData();
  const item: Blog = { ...blog, id: nextId(data.blogs) };
  saveCenterData({ ...data, blogs: [...data.blogs, item] });
  return item;
}

export function updateBlog(id: number, patch: Partial<Blog>) {
  const data = loadCenterData();
  saveCenterData({
    ...data,
    blogs: data.blogs.map((b) => (b.id === id ? { ...b, ...patch } : b)),
  });
}

export function deleteBlog(id: number) {
  const data = loadCenterData();
  saveCenterData({ ...data, blogs: data.blogs.filter((b) => b.id !== id) });
}

export function addBookOrder(order: Omit<BookOrder, "id" | "createdAt">) {
  const data = loadCenterData();
  const item: BookOrder = {
    ...order,
    id: `bo-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  saveCenterData({ ...data, bookOrders: [item, ...data.bookOrders] });
  return item;
}

export function updateBookOrderStatus(
  id: string,
  status: BookOrder["status"]
) {
  const data = loadCenterData();
  saveCenterData({
    ...data,
    bookOrders: data.bookOrders.map((o) =>
      o.id === id ? { ...o, status } : o
    ),
  });
}

export function addTeacherBooking(
  booking: Omit<TeacherBooking, "id" | "createdAt">
) {
  const data = loadCenterData();
  const item: TeacherBooking = {
    ...booking,
    id: `tb-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  saveCenterData({
    ...data,
    teacherBookings: [item, ...data.teacherBookings],
  });
  return item;
}

export function updateTeacherBookingStatus(
  id: string,
  status: TeacherBooking["status"]
) {
  const data = loadCenterData();
  saveCenterData({
    ...data,
    teacherBookings: data.teacherBookings.map((b) =>
      b.id === id ? { ...b, status } : b
    ),
  });
}

export function resetToDefaults() {
  saveCenterData({ ...defaultCenterData });
}
