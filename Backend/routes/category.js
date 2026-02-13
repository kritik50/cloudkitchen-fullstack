const express = require("express");
const router = express.Router();

// import Firestore (already initialized in server.js)
const { db } = require("../firebase/firebase");

// GET all active categories
router.get("/", async (req, res) => {
  try {
     const { category } = req.query;
    //getting data from firebase
    const snapshot = await db
      .collection("categories")
      .where("active", "==", true)
      .get();

    //converting data into json format
    const categories = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error("Error fetching categories:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch categories"
    });
  }
});

module.exports = router;
