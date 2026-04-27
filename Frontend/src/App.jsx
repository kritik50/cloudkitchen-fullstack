import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthModal from "./components/AuthModal";
import Navbar from "./components/Navbar";
import RightSidebar from "./components/RightSidebar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";
import "./App.css";
import "remixicon/fonts/remixicon.css";

function AppShell({ children }) {
  return (
    <>
      <Navbar />
      <AuthModal />
      <RightSidebar />
      {children}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AppShell>
              <Home />
            </AppShell>
          }
        />
        <Route
          path="/menu"
          element={
            <AppShell>
              <Menu />
            </AppShell>
          }
        />
        <Route
          path="/checkout"
          element={
            <AppShell>
              <Checkout />
            </AppShell>
          }
        />
        <Route
          path="/orders"
          element={
            <AppShell>
              <Orders />
            </AppShell>
          }
        />
        <Route path="/plans" element={<Navigate to="/#plans" replace />} />
        <Route path="/customize" element={<Navigate to="/#plans" replace />} />
        <Route path="/profile" element={<Navigate to="/checkout" replace />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
