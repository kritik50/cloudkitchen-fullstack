import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendRoot = path.resolve(__dirname, "..");
const envPath = path.join(frontendRoot, ".env");

function parseEnv(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const raw = fs.readFileSync(filePath, "utf8");
  return raw
    .split(/\r?\n/)
    .filter((line) => line && !line.trim().startsWith("#"))
    .reduce((acc, line) => {
      const idx = line.indexOf("=");
      if (idx === -1) return acc;
      const key = line.slice(0, idx).trim();
      const value = line.slice(idx + 1).trim();
      acc[key] = value;
      return acc;
    }, {});
}

const env = { ...process.env, ...parseEnv(envPath) };

const required = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
];

const invalid = (value) =>
  !value || String(value).trim() === "" || String(value).includes("your-");

const missing = required.filter((key) => invalid(env[key]));

function printStep(label, ok, detail) {
  const mark = ok ? "PASS" : "FAIL";
  console.log(`[${mark}] ${label}${detail ? ` - ${detail}` : ""}`);
}

async function run() {
  console.log("GymBites Firebase Doctor\n");

  if (missing.length) {
    printStep("Frontend env keys", false, `Missing/placeholder: ${missing.join(", ")}`);
    process.exitCode = 1;
    return;
  }

  printStep("Frontend env keys", true, "All required Firebase keys are present");

  const apiKey = env.VITE_FIREBASE_API_KEY;
  const payload = {
    identifier: "healthcheck@gymbites.local",
    continueUri: "http://localhost:5173",
  };

  let response;
  let bodyText = "";
  try {
    response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:createAuthUri?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    bodyText = await response.text();
  } catch (error) {
    printStep("Firebase Auth API reachability", false, error.message);
    process.exitCode = 1;
    return;
  }

  if (response.ok) {
    printStep("Firebase Auth project configuration", true, "Auth API is responding correctly");
    console.log("\nResult: Firebase client auth is ready.");
    return;
  }

  const lower = bodyText.toLowerCase();
  if (lower.includes("configuration_not_found")) {
    printStep(
      "Firebase Auth project configuration",
      false,
      "Authentication is not enabled for this Firebase project"
    );
    console.log("\nAction required (one-time in Firebase Console):");
    console.log("1. Open Firebase Console > Build > Authentication");
    console.log("2. Click 'Get started'");
    console.log("3. Enable Email/Password provider under Sign-in method");
    console.log("4. Add localhost and your production domain in Authorized domains");
    process.exitCode = 1;
    return;
  }

  if (lower.includes("invalid api key") || lower.includes("invalid_api_key")) {
    printStep("Firebase API key", false, "API key is invalid");
    process.exitCode = 1;
    return;
  }

  printStep("Firebase Auth API check", false, bodyText.slice(0, 240));
  process.exitCode = 1;
}

run();
