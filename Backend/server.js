require("dotenv").config();
const express = require("express");
const cors = require("cors");

const contentRoutes = require("./routes/content");
const mealPlansRoutes = require("./routes/mealPlans");
const menuRoutes = require("./routes/menu");
const ordersRoutes = require("./routes/orders");
const contactRoutes = require("./routes/contact");
const customPlanRoutes = require("./routes/customPlan");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "*",
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/content", contentRoutes);
app.use("/api/meal-plans", mealPlansRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api", contactRoutes);
app.use("/api", customPlanRoutes);

// Backward compatibility with existing frontend calls.
app.use("/api/mealPlans", mealPlansRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`CloudKitchen API listening on port ${PORT}`);
});
