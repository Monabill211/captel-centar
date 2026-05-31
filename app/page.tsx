import Navbar from "./navbar";
import HeroPage from "./HeroPage";
import ReviewsSection from "./reviwes";
import AboutSection from "./about";
import TeachersSection from "./tetcher";
import BooksSection from "./books";
import FAQSection from "./f&q";
import Footer from "./footer";
export default function Home() {
  return (
 <>
 <Navbar />
 <HeroPage />
 <AboutSection />
 <TeachersSection />
 <BooksSection />
 <FAQSection />
 <ReviewsSection />
 <Footer />
 </>

  );
}
