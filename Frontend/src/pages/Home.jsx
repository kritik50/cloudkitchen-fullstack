// pages/Home.jsx

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ForWhom from "../components/ForWhom";
import WhyChoose from "../components/WhyChoose";
import Reviews from "../components/Reviews";
import Footer from "../components/Footer";
import MealCarosuel from "../components/MealCarosuel";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <ForWhom />
      <MealCarosuel/>
      <WhyChoose />
      <Reviews />
      <Footer />
    </>
  );
};

export default Home;