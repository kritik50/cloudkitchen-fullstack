import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Plans from "./pages/Plans";
import Loader from "./components/Loader";

import "./App.css";
import "remixicon/fonts/remixicon.css";

function App() {
  const [loading, setLoading] = useState(true); // ✅ DEFINE STATE

  useEffect(() => {
    // 🔥 Simple loader timing (temporary fix)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <Router>
      <Navbar/>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plans" element={<Plans />} />
      </Routes>
    </Router>
  );
}

export default App;