const express = require("express");
const router = express.Router();
const db = require("../firebase/firebase");

router.post("/contact", async (req, res) => {
  try {
    console.log("📩 Incoming request:", req.body); // ✅ DEBUG

    const { name, phone, email, goal, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: "Name and phone required" });
    }

    await db.collection("contact_requests").add({
      name,
      phone,
      email: email || "",
      goal: goal || "",
      message: message || "",

      status: "new",
      source: "website",
      createdAt: new Date(),
      contactedAt: null
    });

    console.log("✅ Saved to Firestore");

    res.status(200).json({ success: true });

  } catch (err) {
    console.error("❌ Contact API Error:", err); // VERY IMPORTANT
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;