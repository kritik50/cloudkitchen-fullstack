// pages/Home.jsx
import { useState, useEffect } from "react";
import { fetchHomepageData } from "../services/api";

import Navbar         from "../components/Navbar";
import Hero           from "../components/Hero";
import ForWhom        from "../components/ForWhom";
import MealCarosuel   from "../components/MealCarosuel";
import WhyChoose      from "../components/WhyChoose";
import Reviews        from "../components/Reviews";
import Footer         from "../components/Footer";
import Loader         from "../components/Loader";

import {
  NavbarSkeleton,
  HeroSkeleton,
  ForWhomSkeleton,
  MealCarouselSkeleton,
  WhyChooseSkeleton,
  ReviewsSkeleton,
} from "../components/Skeletons";

// ── How long the branded loader shows before skeletons take over ──
const LOADER_MIN_MS = 2200;

const Home = () => {
  const [pageData, setPageData]     = useState(null);  // null = not yet fetched
  const [loaderDone, setLoaderDone] = useState(false); // branded loader finished

  // 1. Fire all API calls in parallel immediately on mount
  useEffect(() => {
    fetchHomepageData()
      .then(data => setPageData(data))
      .catch(err  => {
        console.error("Homepage fetch failed:", err);
        setPageData({}); // show skeletons rather than blank screen
      });
  }, []);

  // 2. Ensure the branded loader shows for at least LOADER_MIN_MS
  useEffect(() => {
    const timer = setTimeout(() => setLoaderDone(true), LOADER_MIN_MS);
    return () => clearTimeout(timer);
  }, []);

  // ── Phase 1: Branded loader (first LOADER_MIN_MS ms) ──────────
  if (!loaderDone) {
    return <Loader />;
  }

  // ── Phase 2: Data still loading → show skeletons ──────────────
  // (this typically never shows if fetch > LOADER_MIN_MS — but
  //  on cache-hit the data arrives before the loader ends anyway)
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

  // ── Phase 3: Render page, pass data as props ──────────────────
  // Each component renders immediately with props — no internal fetch.
  // If a section's data is null (fetch failed), the component renders
  // its own skeleton fallback so the rest of the page still works.
  return (
    <>
      <Navbar   data={pageData.nav}    />
      <Hero     data={pageData.hero}   />
      <ForWhom  data={pageData.wif}    />
      <MealCarosuel                    />  {/* uses its own static assets */}
      <WhyChoose data={pageData.wcg}   />
      <Reviews  data={pageData.rev}    />
      <Footer   data={pageData.footer} />
    </>
  );
};

export default Home;