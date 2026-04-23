const express = require("express");
const db = require("../firebase/firebase");

const router = express.Router();

const homepageDocMap = {
  hero: "hero",
  nav: "navbar",
  wif: "wif",
  wcg: "whyChooseUs",
  rev: "reviews",
  footer: "footer",
};

router.get("/homepage", async (req, res) => {
  try {
    const keys = Object.keys(homepageDocMap);
    const snapshots = await Promise.all(
      keys.map((key) => db.collection("homepage").doc(homepageDocMap[key]).get())
    );

    const payload = keys.reduce((acc, key, index) => {
      const snap = snapshots[index];
      acc[key] = snap.exists ? snap.data() : null;
      return acc;
    }, {});

    return res.json(payload);
  } catch (error) {
    console.error("Failed to fetch homepage content:", error);
    return res.status(500).json({ error: "Failed to fetch homepage content" });
  }
});

module.exports = router;
