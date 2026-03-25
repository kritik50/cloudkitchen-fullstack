const express = require("express");
const router = express.Router();
const db = require("../firebase/firebase");

router.get("/plans", async (req, res) => {
  try {
    const snapshot = await db.collection("mealPlans").get();

    if (snapshot.empty) {
      return res.json([]); // ✅ return empty array (NOT error)
    }

    const plans = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(plans); // ✅ MUST be array

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;