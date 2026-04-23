/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useMemo, useState } from "react";

const CART_STORAGE_KEY = "cloudkitchen_cart_v1";
const PROFILE_STORAGE_KEY = "cloudkitchen_profile_v1";

const AppContext = createContext(null);

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors to avoid breaking checkout flow.
  }
}

export function AppProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => readStorage(CART_STORAGE_KEY, []));
  const [profile, setProfileState] = useState(() =>
    readStorage(PROFILE_STORAGE_KEY, {
      name: "",
      phone: "",
      email: "",
      address: "",
    })
  );
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [customPlan, setCustomPlan] = useState({
    goal: "Fat Loss",
    dietType: "Veg",
    mealsPerDay: 3,
    note: "",
  });

  const persistCart = (next) => {
    setCartItems(next);
    writeStorage(CART_STORAGE_KEY, next);
  };

  const addToCart = (item) => {
    const normalized = {
      id: item.id,
      name: item.name,
      category: item.category || item.type || "General",
      unitPrice: Number(item.unitPrice ?? item.price ?? 0),
      quantity: Number(item.quantity ?? 1),
      metadata: item.metadata || {},
    };

    const key = `${normalized.id}:${JSON.stringify(normalized.metadata)}`;
    const existing = cartItems.findIndex(
      (entry) => `${entry.id}:${JSON.stringify(entry.metadata)}` === key
    );

    if (existing >= 0) {
      const next = [...cartItems];
      next[existing] = {
        ...next[existing],
        quantity: next[existing].quantity + normalized.quantity,
      };
      persistCart(next);
      return;
    }

    persistCart([...cartItems, normalized]);
  };

  const updateCartQty = (index, quantity) => {
    const nextQty = Math.max(1, Number(quantity) || 1);
    const next = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: nextQty } : item
    );
    persistCart(next);
  };

  const removeFromCart = (index) => {
    const next = cartItems.filter((_, i) => i !== index);
    persistCart(next);
  };

  const clearCart = () => {
    persistCart([]);
  };

  const setProfile = (nextProfile) => {
    setProfileState(nextProfile);
    writeStorage(PROFILE_STORAGE_KEY, nextProfile);
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
    selectedPlan,
    setSelectedPlan,
    customPlan,
    setCustomPlan,
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
