const express = require("express");
const router = express.Router();
const db = require("../firebase/firebase"); // your existing firebase config

router.post("/contact", async (req, res) => {
  try {
    const { name, phone, email, goal, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: "Name and phone required" });
    }

    await db.collection("contact_requests").add({
      name,
      phone,
      email: email || "",
      goal,
      message: message || "",

      status: "new",
      source: "website",
      createdAt: new Date(),
      contactedAt: null
    });

    res.status(200).json({ success: true });

  } catch (err) {
    console.error("Contact API Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;