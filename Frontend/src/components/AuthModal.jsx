import { useMemo, useState } from "react";
import Popup from "./Popup";
import { useAppContext } from "../context/AppContext";

export default function AuthModal() {
  const {
    authModalOpen,
    setAuthModalOpen,
    prompt,
    setPrompt,
    firebaseInitError,
    loginUser,
    registerUser,
    auth,
    hasDeliveryAddress,
    addAddress,
  } = useAppContext();
  const [mode, setMode] = useState("login");
  const [login, setLogin] = useState({ email: "", password: "" });
  const [register, setRegister] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
  });
  const [authError, setAuthError] = useState("");
  const [addressDraft, setAddressDraft] = useState({
    label: "Home",
    line1: "",
    line2: "",
  });

  const needsAddress = useMemo(
    () => auth.isAuthenticated && !hasDeliveryAddress,
    [auth.isAuthenticated, hasDeliveryAddress]
  );

  const close = () => {
    setAuthModalOpen(false);
    setPrompt({ open: false, title: "", message: "" });
    setAuthError("");
  };

  const submitLogin = async (event) => {
    event.preventDefault();
    setAuthError("");

    try {
      await loginUser({
        email: login.email.trim(),
        password: login.password,
      });
      if (!hasDeliveryAddress) {
        setMode("address");
      } else {
        close();
      }
    } catch (error) {
      setAuthError(error?.message || "Unable to login. Please verify email and password.");
    }
  };

  const submitRegister = async (event) => {
    event.preventDefault();
    setAuthError("");
    try {
      await registerUser({
        ...register,
        name: register.name.trim(),
        phone: register.phone.trim(),
        email: register.email.trim(),
        address: register.address.trim(),
      });
      close();
    } catch (error) {
      setAuthError(error?.message || "Registration failed. Please check your details and try again.");
    }
  };

  const submitAddress = async (event) => {
    event.preventDefault();
    setAuthError("");
    try {
      await addAddress(addressDraft);
      close();
    } catch (error) {
      setAuthError(error?.message || "Unable to save address right now.");
    }
  };

  const title =
    prompt.title ||
    (needsAddress ? "Add delivery address to continue" : "Login / Register to continue");

  const message =
    prompt.message ||
    (needsAddress
      ? "Your account is active, but we need a delivery address before checkout."
      : "Login is only required when you are ready to order or checkout.");

  return (
    <Popup open={authModalOpen} title={title} message={message} onClose={close}>
      <div className="auth-switch">
        <button
          type="button"
          className={`filter-btn${mode === "login" ? " filter-btn--active" : ""}`}
          onClick={() => setMode("login")}
          disabled={needsAddress}
        >
          Login
        </button>
        <button
          type="button"
          className={`filter-btn${mode === "register" ? " filter-btn--active" : ""}`}
          onClick={() => setMode("register")}
          disabled={needsAddress}
        >
          Register
        </button>
      </div>

      {needsAddress || mode === "address" ? (
        <form className="auth-form" onSubmit={submitAddress}>
          <input
            className="form-input"
            placeholder="Address label"
            value={addressDraft.label}
            onChange={(event) => setAddressDraft({ ...addressDraft, label: event.target.value })}
          />
          <input
            className="form-input"
            placeholder="Address line 1"
            value={addressDraft.line1}
            onChange={(event) => setAddressDraft({ ...addressDraft, line1: event.target.value })}
          />
          <input
            className="form-input"
            placeholder="Address line 2"
            value={addressDraft.line2}
            onChange={(event) => setAddressDraft({ ...addressDraft, line2: event.target.value })}
          />
          <button className="btn btn--primary" type="submit">
            Save Address
          </button>
        </form>
      ) : mode === "register" ? (
        <form className="auth-form" onSubmit={submitRegister}>
          <input
            className="form-input"
            placeholder="Full name"
            value={register.name}
            onChange={(event) => setRegister({ ...register, name: event.target.value })}
          />
          <input
            className="form-input"
            placeholder="Phone number"
            value={register.phone}
            onChange={(event) => setRegister({ ...register, phone: event.target.value })}
          />
          <input
            className="form-input"
            placeholder="Email address"
            value={register.email}
            onChange={(event) => setRegister({ ...register, email: event.target.value })}
          />
          <input
            className="form-input"
            placeholder="Password"
            type="password"
            value={register.password}
            onChange={(event) => setRegister({ ...register, password: event.target.value })}
          />
          <textarea
            className="form-textarea"
            placeholder="Delivery address"
            value={register.address}
            onChange={(event) => setRegister({ ...register, address: event.target.value })}
          />
          <button className="btn btn--primary" type="submit">
            Create Account
          </button>
        </form>
      ) : (
        <form className="auth-form" onSubmit={submitLogin}>
          <input
            className="form-input"
            placeholder="Email address"
            value={login.email}
            onChange={(event) => setLogin({ ...login, email: event.target.value })}
          />
          <input
            className="form-input"
            placeholder="Password"
            type="password"
            value={login.password}
            onChange={(event) => setLogin({ ...login, password: event.target.value })}
          />
          <button className="btn btn--primary" type="submit">
            Continue
          </button>
        </form>
      )}
      {firebaseInitError ? <p className="error-copy">{firebaseInitError}</p> : null}
      {authError ? <p className="error-copy">{authError}</p> : null}
    </Popup>
  );
}
