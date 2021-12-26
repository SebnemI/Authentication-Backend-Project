/** @format */

const { Router } = require("express");

const router = Router();

router.use((req, res, next) => {
  console.log("Request made to /POSTS ROUTE");
  next();
});

router.get("/", (req, res) => {
  res.status(200);
});

router.get("/postTitle/:title", (req, res) => {
  res.json({ title: "Last Post" });
});

module.exports = router;
