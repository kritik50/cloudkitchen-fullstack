import { useEffect, useState } from "react";
import ContactModal from "../components/ContactModal/ContactModal";
import Footer from "../components/Footer";
import ForWhom from "../components/ForWhom";
import Hero from "../components/Hero";
import MealCarosuel from "../components/MealCarosuel";
import Navbar from "../components/Navbar";
import Reviews from "../components/Reviews";
import WhyChoose from "../components/WhyChoose";
import { fetchHomepageData } from "../services/api";

const fallbackContent = {
  nav: {
    brand: { name: "CloudKitchen", tagline: "Smart Meal Subscription" },
  },
};

const Home = () => {
  const [content, setContent] = useState(fallbackContent);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let active = true;

    fetchHomepageData()
      .then((data) => {
        if (active) {
          setContent((prev) => ({ ...prev, ...data }));
        }
      })
      .catch(() => {
        if (active) {
          setContent(fallbackContent);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <Navbar data={content.nav} openModal={() => setModalOpen(true)} />
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <Hero data={loading ? null : content.hero} />
      <ForWhom data={loading ? null : content.wif} />
      <MealCarosuel />
      <WhyChoose data={loading ? null : content.wcg} />
      <Reviews data={loading ? null : content.rev} />
      <Footer data={content.footer} />
    </>
  );
};

export default Home;
