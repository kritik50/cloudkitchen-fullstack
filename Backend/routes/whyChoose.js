const express = require("express");
const router = express.Router();
const db = require("../firebase/firebase");

router.get("/wcg", async (req, res) => {
  try {
    const doc = await db.collection("homepage").doc("whyChooseUs").get();

    if (!doc.exists) {
      return res.status(404).json({ message: "whyChoose content not found" });
    }

    res.json(doc.data());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
