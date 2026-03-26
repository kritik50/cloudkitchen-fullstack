// components/Skeletons.jsx
import React from "react";
import "./Skeletons.css";

export const NavbarSkeleton = () => (
  <div className="skel-navbar">
    <div className="skel skel-nav-logo" />
    <div className="skel-nav-links">
      <div className="skel skel-nav-link" />
      <div className="skel skel-nav-link" />
      <div className="skel skel-nav-link" />
      <div className="skel skel-nav-link" />
    </div>
    <div className="skel skel-nav-btn" />
  </div>
);

export const HeroSkeleton = () => (
  <div className="skel-hero">
    <div className="skel-hero-container">
      <div className="skel-hero-left">
        <div className="skel skel-hero-pill" />
        <div className="skel skel-hero-h1-1" />
        <div className="skel skel-hero-h1-2" />
        <div className="skel skel-hero-sub" />
        <div className="skel skel-hero-sub2" />
        <div className="skel skel-hero-stats" />
        <div className="skel-hero-btns">
          <div className="skel skel-hero-btn1" />
          <div className="skel skel-hero-btn2" />
        </div>
      </div>
      <div className="skel-hero-right">
        <div className="skel skel-hero-image" />
      </div>
    </div>
  </div>
);

export const ForWhomSkeleton = () => (
  <div className="skel-who">
    <div className="skel-header">
      <div className="skel skel-eyebrow" />
      <div className="skel skel-title" />
      <div className="skel skel-subtitle" />
      <div className="skel skel-subtitle2" />
    </div>
    <div className="skel-who-cards">
      <div className="skel skel-who-card" />
      <div className="skel skel-who-card" />
      <div className="skel skel-who-card" />
    </div>
  </div>
);

export const MealCarouselSkeleton = () => (
  <div className="skel-carousel">
    <div className="skel-header">
      <div className="skel skel-eyebrow" />
      <div className="skel skel-title" />
      <div className="skel skel-subtitle" />
    </div>
    <div className="skel-carousel-track">
      {[...Array(5)].map((_, i) => (
        <div className="skel skel-meal-card" key={i} />
      ))}
    </div>
  </div>
);

export const WhyChooseSkeleton = () => (
  <div className="skel-why">
    <div className="skel-why-container">
      <div className="skel-why-grid">
        <div className="skel skel-why-box" />
        <div className="skel skel-why-box" />
        <div className="skel skel-why-box" />
        <div className="skel skel-why-box" />
      </div>
      <div className="skel-why-right">
        <div className="skel skel-eyebrow" />
        <div className="skel skel-why-title" />
        <div className="skel skel-why-title2" />
        <div className="skel skel-why-text" />
        <div className="skel skel-why-text2" />
        <div className="skel skel-why-text3" />
        <div className="skel skel-why-stats" />
        <div className="skel skel-why-btn" />
      </div>
    </div>
  </div>
);

export const ReviewsSkeleton = () => (
  <div className="skel-reviews">
    <div className="skel-header">
      <div className="skel skel-eyebrow" />
      <div className="skel skel-title" />
      <div className="skel skel-subtitle" />
    </div>
    <div className="skel-reviews-grid">
      <div className="skel skel-review-card" />
      <div className="skel skel-review-card" />
      <div className="skel skel-review-card" />
    </div>
    <div className="skel skel-trust" />
  </div>
);

// Footer has no skeleton — it's below the fold, silent null is fine
export const FooterSkeleton = () => null;