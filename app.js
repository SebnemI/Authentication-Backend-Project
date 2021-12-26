/** @format */

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const local = require("./strategies/local");

const usersRoute = require("./routes/user");
const postsRoute = require("./routes/posts");
const authRoute = require("./routes/auth");

const store = new session.MemoryStore();
const { restart } = require("nodemon");
const app = express();

app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 30000 },
    saveUninitialized: false,
    store,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use("/users", usersRoute);
app.use("/posts", postsRoute);
app.use("/auth", authRoute);

app.listen(3000, () => {
  console.log("Server is running on Port 3000");
});

/*
const users = [
  { name: "Bob", age: 30 },
  { name: "Alice", age: 40 },
  { name: "Peter", age: 53 },
];

const posts = [
  { title: "New Tesla cars" },
  { title: "Spider-Man movie" },
  { title: "Bidens new speech" },
];


app.get("/", (req, res) => {
  res.send({
    msg: "Welcome",
    user: {},
  });
});

app.post("/", (req, res) => {
  const user = req.body;
  users.push(user);
  res.status(201).send("Created User");
});

app.get("/users", (req, res) => {
  res.status(200).send(users);
});

app.get("/posts", (req, res) => {
  res.status(200).send(posts);
});

app.get("/users/:name", (req, res) => {
  const { name } = req.params;
  const user = users.find((user) => user.name === name);
  if (user) res.status(200).send(user);
  else res.status(404).send("User not found.");
});

app.get("/posts", (req, res) => {
  const { title } = req.query;
  if (title) {
    const post = posts.find((post) => post.title === title);
    if (post) {
      res.status(200).send(post);
    } else res.status(404).send("Post not found.");
  }
});

function validateAuthToken(req, res, next) {
  console.log("inside Validate Auth Token");
  const { authorization } = req.headers;
  if (authorization && authorization === "123") {
    next();
  } else {
    res.status(403).send({ msg: "Forbidden, incorrect credentials..." });
  }
}

app.post("/posts", validateAuthToken, (req, res) => {
  const post = req.body;
  posts.push(post);
  res.status(201).send(post);
});

function validateCookie(req, res, next) {
  const { cookies } = req;
  if ("session_id" in cookies) {
    console.log("Session ID exists.");
    if (cookies.session_id === "123456") next();
    else res.status(403).send({ msg: "Not authenticated" });
  } else res.status(403).send({ msg: "Not authenticated" });
}

app.get("/signin", (req, res) => {
  res.cookie("session_id", "123456");
  res.status(200).json({ msg: "Logged in" });
});

app.get("/protected", validateCookie, (req, res) => {
  res.status(200).json({ msg: "You are authorized!" });
});

app.post("/login", (req, res) => {
  console.log(req.sessionID);
  const { username, password } = req.body;
  if (username && password) {
    if (req.session.authenticated) {
      res.json(req.session);
    } else {
      if (password === "123") {
        req.session.authenticated = true;
        req.session.user = {
          username,
          password,
        };
        res.json(req.session);
      } else {
        res.status(403).json({ msg: "Bad credentials" });
      }
    }
  } else res.status(403).json({ msg: "Bad credentials" });
});
*/
