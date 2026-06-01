import { Suspense } from "react";
import BookOrderPage from "./BookOrderPage";

export default function Page() {
  return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
      <BookOrderPage />
    </Suspense>
  );
}