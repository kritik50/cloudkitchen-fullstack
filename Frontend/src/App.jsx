import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import "remixicon/fonts/remixicon.css";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/menu" element={<Menu />} />
          <Route path="/plans" element={<Plans />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
