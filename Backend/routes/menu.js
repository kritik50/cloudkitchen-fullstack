const express = require("express");
const menuItems = require("../data/menuItems");

const router = express.Router();

router.get("/", (req, res) => {
  const category = req.query.category;

  if (!category || category === "All") {
    return res.json(menuItems);
  }

  const filtered = menuItems.filter(
    (item) => item.category.toLowerCase() === String(category).toLowerCase()
  );

  return res.json(filtered);
});

module.exports = router;
