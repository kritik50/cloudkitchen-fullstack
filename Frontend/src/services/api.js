const BASE_URL = import.meta.env.VITE_API_URL;

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = payload.error || `Request failed: ${response.status}`;
    throw new Error(message);
  }

  return payload;
}

export function fetchHomepageData() {
  return request("/api/content/homepage");
}

export function fetchMealPlans() {
  return request("/api/meal-plans/plans");
}

export function fetchMenuItems(category = "All") {
  const query = category && category !== "All" ? `?category=${category}` : "";
  return request(`/api/menu${query}`);
}

export function submitContact(payload) {
  return request("/api/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function submitCustomPlan(payload) {
  return request("/api/custom-plan", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function createOrder(payload) {
  return request("/api/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function fetchOrders(phone) {
  const query = phone ? `?phone=${encodeURIComponent(phone)}` : "";
  return request(`/api/orders${query}`);
}

export default BASE_URL;
