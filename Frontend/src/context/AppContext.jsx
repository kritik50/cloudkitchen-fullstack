/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth as firebaseAuth, firebaseInitError } from "../services/firebase";
import {
  addUserAddress,
  clearUserCart,
  createUserOrder,
  fetchUserOrders,
  removeCartItem,
  removeUserAddress,
  saveCartItem,
  saveUserProfile,
  setPrimaryAddress as savePrimaryAddress,
  watchUserAddresses,
  watchUserCart,
  watchUserProfile,
} from "../services/firestoreApi";

const AppContext = createContext(null);
const THEME_STORAGE_KEY = "gymbites_theme";

function mapAuthError(error) {
  const code = error?.code || "";
  const fallback = error?.message || "Authentication failed. Please try again.";

  if (code.includes("configuration-not-found")) {
    return "Firebase Authentication is not enabled for this project. Enable Authentication and the Email/Password sign-in method in Firebase Console.";
  }
  if (code.includes("invalid-api-key")) {
    return "Firebase API key is invalid. Check VITE_FIREBASE_API_KEY in Frontend/.env.";
  }
  if (code.includes("app-not-authorized") || code.includes("unauthorized-domain")) {
    return "This domain is not authorized for Firebase Authentication. Add it under Firebase Authentication > Settings > Authorized domains.";
  }
  if (code.includes("operation-not-allowed")) {
    return "Email/password login is disabled. Enable Email/Password in Firebase Authentication > Sign-in method.";
  }
  if (code.includes("network-request-failed")) {
    return "Network error while contacting Firebase. Check connection and try again.";
  }
  if (code.includes("invalid-credential") || code.includes("wrong-password")) {
    return "Incorrect email or password.";
  }
  if (code.includes("user-not-found")) {
    return "No account found for this email.";
  }
  if (code.includes("email-already-in-use")) {
    return "An account with this email already exists. Please login instead.";
  }
  if (code.includes("weak-password")) {
    return "Password must be at least 6 characters.";
  }

  return fallback;
}

function normalizeCartItem(item) {
  return {
    id: item.id,
    name: item.name,
    category: item.category || item.type || "General",
    unitPrice: Number(item.unitPrice ?? item.price ?? 0),
    quantity: Math.max(1, Number(item.quantity ?? 1)),
    metadata: item.metadata || {},
  };
}

function cartKey(item) {
  return `${item.id}:${JSON.stringify(item.metadata || {})}`;
}

export function AppProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [profile, setProfileState] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [auth, setAuthState] = useState({
    isAuthenticated: false,
    userId: null,
    name: "",
    email: "",
    phone: "",
    primaryAddressId: null,
  });
  const [addresses, setAddresses] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isBootstrapping, setIsBootstrapping] = useState(Boolean(firebaseAuth));
  const [prompt, setPrompt] = useState({
    open: false,
    title: "",
    message: "",
  });
  const [customPlan, setCustomPlan] = useState({
    goal: "Fat Loss",
    dietType: "Veg",
    mealsPerDay: 3,
    note: "",
  });
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    return saved === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    if (!firebaseAuth) {
      return undefined;
    }

    let cartUnsub = null;
    let addressUnsub = null;
    let profileUnsub = null;

    const authUnsub = onAuthStateChanged(firebaseAuth, async (user) => {
      cartUnsub?.();
      addressUnsub?.();
      profileUnsub?.();
      cartUnsub = null;
      addressUnsub = null;
      profileUnsub = null;

      if (!user) {
        setAuthState({
          isAuthenticated: false,
          userId: null,
          name: "",
          email: "",
          phone: "",
          primaryAddressId: null,
        });
        setProfileState({
          name: "",
          phone: "",
          email: "",
          address: "",
        });
        setAddresses([]);
        setCartItems([]);
        setIsBootstrapping(false);
        return;
      }

      setAuthState((prev) => ({
        ...prev,
        isAuthenticated: true,
        userId: user.uid,
        name: user.displayName || "",
        email: user.email || "",
      }));

      cartUnsub = watchUserCart(user.uid, (items) => {
        setCartItems(items);
      });

      addressUnsub = watchUserAddresses(user.uid, (items) => {
        setAddresses(items);
      });

      profileUnsub = watchUserProfile(user.uid, (userDoc) => {
        if (!userDoc) {
          setProfileState({
            name: user.displayName || "",
            phone: "",
            email: user.email || "",
            address: "",
          });
          return;
        }

        setAuthState((prev) => ({
          ...prev,
          name: userDoc.name || user.displayName || "",
          email: userDoc.email || user.email || "",
          phone: userDoc.phone || "",
          primaryAddressId: userDoc.primaryAddressId || null,
        }));

        setProfileState((prev) => ({
          ...prev,
          name: userDoc.name || prev.name || user.displayName || "",
          phone: userDoc.phone || prev.phone || "",
          email: userDoc.email || prev.email || user.email || "",
        }));
      });

      setIsBootstrapping(false);
    });

    return () => {
      authUnsub();
      cartUnsub?.();
      addressUnsub?.();
      profileUnsub?.();
    };
  }, []);

  const activeAddress = addresses.find((item) => item.id === auth.primaryAddressId) || null;

  const hasDeliveryAddress = Boolean(activeAddress?.line1 || addresses.length > 0);

  const upsertCart = (nextItem) => {
    setCartItems((prev) => {
      const targetKey = cartKey(nextItem);
      const index = prev.findIndex((item) => cartKey(item) === targetKey);

      if (index === -1) return [...prev, nextItem];

      const next = [...prev];
      next[index] = {
        ...next[index],
        quantity: next[index].quantity + nextItem.quantity,
      };
      return next;
    });
  };

  const addToCart = async (item) => {
    const normalized = normalizeCartItem(item);
    upsertCart(normalized);

    if (auth.isAuthenticated && auth.userId) {
      const merged = {
        ...normalized,
        quantity:
          cartItems.find((entry) => cartKey(entry) === cartKey(normalized))?.quantity +
            normalized.quantity || normalized.quantity,
      };
      await saveCartItem(auth.userId, merged);
    }
  };

  const updateCartQty = async (index, quantity) => {
    const nextQty = Math.max(1, Number(quantity) || 1);
    let target = null;

    setCartItems((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        target = { ...item, quantity: nextQty };
        return target;
      })
    );

    if (auth.isAuthenticated && auth.userId && target) {
      await saveCartItem(auth.userId, target);
    }
  };

  const removeFromCart = async (index) => {
    const item = cartItems[index];
    setCartItems((prev) => prev.filter((_, i) => i !== index));

    if (auth.isAuthenticated && auth.userId && item) {
      await removeCartItem(auth.userId, item);
    }
  };

  const clearCart = async () => {
    const snapshot = [...cartItems];
    setCartItems([]);

    if (auth.isAuthenticated && auth.userId && snapshot.length) {
      await clearUserCart(auth.userId, snapshot);
    }
  };

  const setProfile = async (nextProfile) => {
    setProfileState((prev) => {
      const resolved =
        typeof nextProfile === "function" ? nextProfile(prev) : nextProfile;
      return resolved;
    });

    if (auth.isAuthenticated && auth.userId) {
      const resolved =
        typeof nextProfile === "function" ? nextProfile(profile) : nextProfile;
      await saveUserProfile(auth.userId, {
        ...resolved,
        primaryAddressId: auth.primaryAddressId || null,
      });
    }
  };

  const loginUser = async ({ email, password }) => {
    if (!firebaseAuth || firebaseInitError) {
      throw new Error(firebaseInitError || "Firebase Auth is not configured.");
    }
    setCartItems([]); // Clear guest cart on login.
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      throw new Error(mapAuthError(error));
    }
  };

  const registerUser = async ({ name, email, password, phone, address }) => {
    if (!firebaseAuth || firebaseInitError) {
      throw new Error(firebaseInitError || "Firebase Auth is not configured.");
    }
    if (!name?.trim()) throw new Error("Please enter your full name.");
    if (!email?.trim()) throw new Error("Please enter a valid email.");
    if (!password?.trim()) throw new Error("Please enter a password.");
    if (password.trim().length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    setCartItems([]); // Clear guest cart on registration.
    let credential = null;

    try {
      credential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      throw new Error(mapAuthError(error));
    }

    if (name) {
      await updateProfile(credential.user, { displayName: name.trim() });
    }

    await saveUserProfile(credential.user.uid, {
      name: name?.trim() || "",
      phone: phone || "",
      email: email.trim(),
      primaryAddressId: null,
    });

    if (address) {
      const created = await addUserAddress(credential.user.uid, {
        label: "Home",
        line1: address,
        line2: "",
      });
      await savePrimaryAddress(credential.user.uid, created.id);
    }
  };

  const logoutUser = async () => {
    if (!firebaseAuth || firebaseInitError) return;
    await signOut(firebaseAuth);
  };

  const addAddress = async (address) => {
    if (!auth.userId) throw new Error("Login required");
    const created = await addUserAddress(auth.userId, address);
    if (!auth.primaryAddressId) {
      await savePrimaryAddress(auth.userId, created.id);
    }
    return created;
  };

  const setPrimaryAddress = async (addressId) => {
    if (!auth.userId) return;
    await savePrimaryAddress(auth.userId, addressId);
  };

  const removeAddress = async (addressId) => {
    if (!auth.userId) return;
    await removeUserAddress(auth.userId, addressId);

    if (auth.primaryAddressId === addressId) {
      const nextPrimary = addresses.find((item) => item.id !== addressId)?.id || null;
      await savePrimaryAddress(auth.userId, nextPrimary);
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const placeOrder = async ({ notes = "" } = {}) => {
    if (!auth.userId) throw new Error("Login required");
    if (!cartItems.length) throw new Error("Cart is empty");
    if (!hasDeliveryAddress) throw new Error("Address missing");

    const totalsSnapshot = cartItems.reduce(
      (acc, item) => {
        acc.subtotal += Number(item.unitPrice) * Number(item.quantity);
        return acc;
      },
      { subtotal: 0 }
    );
    totalsSnapshot.deliveryFee = totalsSnapshot.subtotal > 0 ? 49 : 0;
    totalsSnapshot.grandTotal = totalsSnapshot.subtotal + totalsSnapshot.deliveryFee;

    const orderId = await createUserOrder(auth.userId, {
      customer: {
        name: profile.name || auth.name,
        phone: profile.phone || auth.phone,
        email: profile.email || auth.email,
        address: activeAddress?.line1 || "",
      },
      address: activeAddress || null,
      items: cartItems.map((item) => ({
        ...item,
        lineTotal: Number(item.unitPrice) * Number(item.quantity),
      })),
      totals: totalsSnapshot,
      notes,
    });

    await clearCart();
    return orderId;
  };

  const getOrders = async () => {
    if (!auth.userId) return [];
    return fetchUserOrders(auth.userId);
  };

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + Number(item.unitPrice) * Number(item.quantity),
      0
    );
    const deliveryFee = subtotal > 0 ? 49 : 0;
    const grandTotal = subtotal + deliveryFee;
    return { subtotal, deliveryFee, grandTotal };
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    totals,
    profile,
    setProfile,
    auth,
    loginUser,
    registerUser,
    logoutUser,
    addresses,
    addAddress,
    removeAddress,
    setPrimaryAddress,
    activeAddress,
    hasDeliveryAddress,
    authModalOpen,
    setAuthModalOpen,
    sidebarOpen,
    setSidebarOpen,
    prompt,
    setPrompt,
    selectedPlan,
    setSelectedPlan,
    customPlan,
    setCustomPlan,
    placeOrder,
    getOrders,
    isBootstrapping,
    firebaseInitError,
    theme,
    toggleTheme,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }
  return context;
}
