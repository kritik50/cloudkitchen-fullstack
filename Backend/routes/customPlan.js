const express = require("express");
const router = express.Router();
const db = require("../firebase/firebase"); // your existing firebase setup

// 🔥 POST → Save custom plan request
router.post("/custom-plan", async (req, res) => {
  try {
    console.log("📩 Incoming request:", req.body); // ✅ DEBUG
    
    const {
      name,
      phone,
      email,
      goal,
      dietType,
      weight,
      height,
      mealsPerDay,
      budget,
      message
    } = req.body;

    // ✅ Basic validation
    if (!name || !phone) {
      return res.status(400).json({
        error: "Name and phone are required"
      });
    }

    // 🔥 Save to Firestore (NEW COLLECTION)
    await db.collection("custom_plan_requests").add({
      name,
      phone,
      email: email || "",
      goal: goal || "Custom Plan",

      // 🔥 custom fields
      dietType: dietType || "",
      weight: weight || null,
      height: height || null,
      mealsPerDay: mealsPerDay || null,
      budget: budget || "",

      message: message || "",

      // 🔥 business tracking fields
      status: "new",
      priority: "high", // custom users are premium leads 💰
      source: "website",

      createdAt: new Date(),
      contactedAt: null
    });

    return res.status(200).json({
      success: true,
      message: "Custom plan request saved"
    });

  } catch (err) {
    console.error("Custom Plan API Error:", err);
    return res.status(500).json({
      error: "Server error"
    });
  }
});

module.exports = router;