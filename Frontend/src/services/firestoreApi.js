import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";

function getDb() {
  if (!db) {
    throw new Error("Firestore is not configured. Check Firebase environment keys.");
  }
  return db;
}

function cartDocId(item) {
  const meta = JSON.stringify(item.metadata || {});
  return encodeURIComponent(`${item.id}::${meta}`);
}

export function watchUserCart(userId, onChange) {
  const ref = collection(getDb(), "users", userId, "cart");
  return onSnapshot(ref, (snapshot) => {
    const items = snapshot.docs.map((entry) => {
      const data = entry.data();
      return {
        id: data.id,
        name: data.name,
        category: data.category,
        unitPrice: Number(data.unitPrice || 0),
        quantity: Number(data.quantity || 1),
        metadata: data.metadata || {},
      };
    });
    onChange(items);
  });
}

export async function saveCartItem(userId, item) {
  const itemRef = doc(getDb(), "users", userId, "cart", cartDocId(item));
  await setDoc(
    itemRef,
    {
      id: item.id,
      name: item.name,
      category: item.category,
      unitPrice: Number(item.unitPrice || 0),
      quantity: Number(item.quantity || 1),
      metadata: item.metadata || {},
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function removeCartItem(userId, item) {
  const itemRef = doc(getDb(), "users", userId, "cart", cartDocId(item));
  await deleteDoc(itemRef);
}

export async function clearUserCart(userId, items) {
  await Promise.all(items.map((item) => removeCartItem(userId, item)));
}

export function watchUserAddresses(userId, onChange) {
  const ref = collection(getDb(), "users", userId, "addresses");
  return onSnapshot(ref, (snapshot) => {
    const addresses = snapshot.docs.map((entry) => ({
      id: entry.id,
      ...entry.data(),
    }));
    onChange(addresses);
  });
}

export async function addUserAddress(userId, address) {
  const ref = collection(getDb(), "users", userId, "addresses");
  const result = await addDoc(ref, {
    label: address.label || "Address",
    line1: address.line1 || "",
    line2: address.line2 || "",
    createdAt: serverTimestamp(),
  });
  return { id: result.id, ...address };
}

export async function removeUserAddress(userId, addressId) {
  const addressRef = doc(getDb(), "users", userId, "addresses", addressId);
  await deleteDoc(addressRef);
}

export async function setPrimaryAddress(userId, addressId) {
  const userRef = doc(getDb(), "users", userId);
  await setDoc(userRef, { primaryAddressId: addressId }, { merge: true });
}

export function watchUserProfile(userId, onChange) {
  const userRef = doc(getDb(), "users", userId);
  return onSnapshot(userRef, (snapshot) => {
    onChange(snapshot.exists() ? snapshot.data() : null);
  });
}

export async function saveUserProfile(userId, profile) {
  const userRef = doc(getDb(), "users", userId);
  await setDoc(
    userRef,
    {
      name: profile.name || "",
      phone: profile.phone || "",
      email: profile.email || "",
      primaryAddressId: profile.primaryAddressId || null,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function createUserOrder(userId, order) {
  const ref = collection(getDb(), "users", userId, "orders");
  const result = await addDoc(ref, {
    ...order,
    status: "PLACED",
    createdAt: serverTimestamp(),
  });
  return result.id;
}

export async function fetchUserOrders(userId) {
  const ref = collection(getDb(), "users", userId, "orders");
  const q = query(ref, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() }));
}
