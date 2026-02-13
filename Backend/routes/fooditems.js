const express = require("express");
const router = express.Router();

// import Firestore (already initialized)
const { db } = require("../firebase/firebase");

// GET food items (optionally filtered by category)
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    let query = db
      .collection("food_items")
      .where("available", "==", true);

    if (category) {
      query = query.where("category", "==", category);
    }

    const snapshot = await query.get();

    const fooditems = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json({
      success: true,
      data: fooditems
    });
  } catch (error) {
    console.error("Error fetching food items:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch food items"
    });
  }
});

module.exports = router;
