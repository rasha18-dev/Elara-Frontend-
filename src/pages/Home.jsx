import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import Customization from "../components/Customization";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SectionLatest from "../components/SectionLatest";
import Testimonials from "../components/Testimonials";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      <SectionLatest />
      <FeaturedProducts />
      <Customization />
      <Testimonials />
      <Footer />
    </>
  );
}
