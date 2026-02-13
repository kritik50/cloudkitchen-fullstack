import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ForWhom from "./components/ForWhom";
import WhyChoose from "./components/WhyChoose";
import MealCarousel from "./components/MealCarosuel";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <ForWhom/>
      <MealCarousel/>
      <WhyChoose/>
      <Reviews/>
      <Footer/>
      
    </>
  
  );
}

export default App;
