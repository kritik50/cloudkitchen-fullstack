import React, { useState } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import ContactModal from "./components/ContactModal/ContactModal";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Plans from "./pages/Plans";
import CustomizePlan from "./pages/CustomizePlan";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import "./App.css";
import "remixicon/fonts/remixicon.css";

function AppShell() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Navbar openModal={() => setModalOpen(true)} />
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<AppShell />}>
          <Route path="/menu" element={<Menu />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/customize" element={<CustomizePlan />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
