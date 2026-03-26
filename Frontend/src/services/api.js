// services/api.js

const BASE_URL = import.meta.env.VITE_API_URL;

export default BASE_URL;

// ── Cache config ───────────────────────────────────────────
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function readCache(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { ts, data } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function writeCache(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify({ ts: Date.now(), data }));
  } catch {
    // localStorage full — silently ignore
  }
}

// ── Single fetch with cache ────────────────────────────────
async function fetchWithCache(url, cacheKey) {
  const cached = readCache(cacheKey);
  if (cached) return cached;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${url}`);
  const data = await res.json();

  writeCache(cacheKey, data);
  return data;
}

// ── Fetch ALL homepage sections in parallel ────────────────
// Uses Promise.allSettled so one failing endpoint never
// breaks the rest of the page.
export async function fetchHomepageData() {
  // Check combined cache first — instant on return visits
  const COMBINED_KEY = "gymbites_homepage_v1";
  const fullCache = readCache(COMBINED_KEY);
  if (fullCache) return fullCache;

  const [hero, nav, wif, wcg, rev, footer] = await Promise.allSettled([
    fetchWithCache(`${BASE_URL}/api/homepage/hero`, "gb_hero"),
    fetchWithCache(`${BASE_URL}/api/homepage/nav`, "gb_nav"),
    fetchWithCache(`${BASE_URL}/api/homepage/wif`, "gb_wif"),
    fetchWithCache(`${BASE_URL}/api/homepage/wcg`, "gb_wcg"),
    fetchWithCache(`${BASE_URL}/api/homepage/rev`, "gb_rev"),
    fetchWithCache(`${BASE_URL}/api/homepage/foo`, "gb_footer"),
  ]);

  const result = {
    hero: hero.status === "fulfilled" ? hero.value : null,
    nav: nav.status === "fulfilled" ? nav.value : null,
    wif: wif.status === "fulfilled" ? wif.value : null,
    wcg: wcg.status === "fulfilled" ? wcg.value : null,
    rev: rev.status === "fulfilled" ? rev.value : null,
    footer: footer.status === "fulfilled" ? footer.value : null,
  };

  // Cache the combined result so the next visit is instant
  writeCache(COMBINED_KEY, result);
  return result;
}

// ── Clear all cache (force fresh fetch) ───────────────────
export function clearHomepageCache() {
  [
    "gymbites_homepage_v1",
    "gb_hero",
    "gb_nav",
    "gb_wif",
    "gb_wcg",
    "gb_rev",
    "gb_footer",
  ].forEach((k) => localStorage.removeItem(k));
}
