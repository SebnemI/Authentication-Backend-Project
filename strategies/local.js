/** @format */

const localStrategy = require("passport-local");
const passport = require("passport");
const db = require("../database");

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  try {
    const result = await db
      .promise()
      .query(`SELECT * FROM USERS WHERE USERNAME= '${username}'`);
    if (result[0][0]) {
      done(null, result[0][0]);
    }
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      const result = await db
        .promise()
        .query(`SELECT * FROM USERS WHERE USERNAME= '${username}'`);

      let matchingUsers = result[0];

      if (matchingUsers.length === 0) {
        done(null, false);
      } else {
        if (matchingUsers[0].password === password) {
          done(null, matchingUsers[0]);
        } else {
          done(null, false);
        }
      }
    } catch (err) {
      done(err, false);
    }
  })
);
