/** @format */

const { Router } = require("express");
const db = require("../database");

const { check, validationResult } = require("express-validator");

const router = Router();

router.get("/", async (req, res) => {
  if (req.user) {
    console.log(req.user);
    const results = await db.promise().query(`SELECT * FROM USERS`);
    res.status(200).send(results[0]);
  } else {
    res.status(403).send({ msg: "Not Authenticated!" });
  }
});

router.get("/posts", (req, res) => {
  res.json({ route: "Posts" });
});

router.post(
  "/",
  [
    check("username")
      .notEmpty()
      .withMessage("Username cannot be empty")
      .isLength({ min: 5 })
      .withMessage("username must be at least 5 characters"),
    check("password").notEmpty().withMessage("Password cannot be empty"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;

    if (username && password) {
      try {
        db.promise().query(
          `INSERT INTO USERS VALUES('${username}','${password}')`
        );
        res.status(201).send({ msg: "Created User" });
      } catch (error) {
        console.log(error);
      }
    }
  }
);

module.exports = router;
