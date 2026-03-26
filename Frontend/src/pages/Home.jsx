import React, { useState, useEffect } from "react";
import { fetchHomepageData } from "../services/api";

import Navbar from "../components/Navbar";
import ContactModal from "../components/ContactModal/ContactModal"; // ✅ ADD

import Hero from "../components/Hero";
import ForWhom from "../components/ForWhom";
import MealCarosuel from "../components/MealCarosuel";
import WhyChoose from "../components/WhyChoose";
import Reviews from "../components/Reviews";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import {
  NavbarSkeleton,
  HeroSkeleton,
  ForWhomSkeleton,
  MealCarouselSkeleton,
  WhyChooseSkeleton,
  ReviewsSkeleton,
} from "../components/Skeletons";

const LOADER_MIN_MS = 2200;

const Home = () => {
  const [pageData, setPageData] = useState(null);
  const [loaderDone, setLoaderDone] = useState(false);

  // 🔥 MODAL STATE
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchHomepageData()
      .then((data) => setPageData(data))
      .catch((err) => {
        console.error("Homepage fetch failed:", err);
        setPageData({});
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoaderDone(true), LOADER_MIN_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!loaderDone) {
    return <Loader />;
  }

  if (!pageData) {
    return (
      <>
        <NavbarSkeleton />
        <HeroSkeleton />
        <ForWhomSkeleton />
        <MealCarouselSkeleton />
        <WhyChooseSkeleton />
        <ReviewsSkeleton />
      </>
    );
  }

  return (
    <>
      {/* 🔥 PASS MODAL HANDLER */}
      <Navbar
        data={pageData.nav}
        openModal={() => setIsModalOpen(true)}
      />

      {/* 🔥 MODAL */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Hero data={pageData.hero} />
      <ForWhom data={pageData.wif} />
      <MealCarosuel />
      <WhyChoose data={pageData.wcg} />
      <Reviews data={pageData.rev} />
      <Footer data={pageData.footer} />
    </>
  );
};

export default Home;