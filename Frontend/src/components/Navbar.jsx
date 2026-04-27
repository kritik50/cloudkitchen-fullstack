import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const PRE_AUTH_LINKS = [
  { label: "Menu", href: "/menu" },
  { label: "Explore", href: "/#meals" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { cartItems, auth, setAuthModalOpen, setSidebarOpen } = useAppContext();
  const cartCount = cartItems.reduce((sum, item) => sum + Number(item.quantity), 0);

  return (
    <header className="topbar">
      <div className="container topbar__inner">
        <Link className="brand" to="/">
          <span className="brand__name">GymBites</span>
          <span className="brand__tag">Macros-first meals for stronger routines</span>
        </Link>

        <nav className="topbar__nav" aria-label="Primary">
          {!auth.isAuthenticated ? (
            PRE_AUTH_LINKS.map((link) =>
              link.href.startsWith("/#") ? (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} to={link.href}>
                  {link.label}
                </Link>
              )
            )
          ) : (
            <>
              <Link to="/menu">Menu</Link>
              <Link to="/orders">Track Order</Link>
            </>
          )}
        </nav>

        <div className="topbar__actions">
          {!auth.isAuthenticated ? (
            <button className="btn btn--primary" type="button" onClick={() => setAuthModalOpen(true)}>
              Login / Register
            </button>
          ) : (
            <>
              <button className="cart-chip cart-chip--clickable" type="button" onClick={() => navigate("/checkout")}>
                Cart {cartCount}
              </button>
              <button className="profile-icon" type="button" onClick={() => setSidebarOpen(true)}>
                {auth.name?.trim()?.[0] || "G"}
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
