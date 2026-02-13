require("dotenv").config();
const express = require("express");
const cors = require("cors");

// const categoryRoutes = require("./routes/category");
// const fooditemsRoutes = require("./routes/fooditems");

const homepageRoutes = require("./routes/homepage");
const whoIsForRoutes = require("./routes/whoIsFor");
const whyChooseRoutes = require("./routes/whyChoose");
const reviewsRoutes = require("./routes/reviews");
const footerRoutes = require("./routes/footer");
const navbarRoutes = require("./routes/navbar");


const app = express();

app.use(cors());
app.use(express.json());

// routes
// app.use("/api/categories", categoryRoutes);
// app.use("/api/fooditems", fooditemsRoutes);

app.use("/api/homepage", homepageRoutes);
app.use("/api/homepage", whoIsForRoutes);
app.use("/api/homepage", whyChooseRoutes);
app.use("/api/homepage", reviewsRoutes);
app.use("/api/homepage", footerRoutes);
app.use("/api/homepage", navbarRoutes);


app.listen(5000, () => {
  console.log("Server running at https://cloudkitchen-fullstack.onrender.com");
});
