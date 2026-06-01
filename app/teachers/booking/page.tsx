import { Suspense } from "react";
import BookingPage from "./BookingPage";

export default function Page() {
  return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
      <BookingPage />
    </Suspense>
  );
}