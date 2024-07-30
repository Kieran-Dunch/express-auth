const express = require("express");
const app = express();
// Import the passport library below:
const passport = require("passport");
// Import the passport-local library below:
const LocalStrategy = require("passport-local").Strategy;

const session = require("express-session");
const PORT = process.env.PORT || 5000;

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Add the middleware to initialize the passport library below:
app.use(passport.initialize());
// Add the middleware to implement a session with passport below:
app.use(passport.session());

// Add your passport local strategy below:
passport.use(
  new LocalStrategy(function(username, password, done) {
    db.users.findByUsername(username, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      if (user.password != password) return done(null, false);
      return done(null, user);
    });
  })
);

app.get("/", (req, res) => {
  res.send("Hello from the homepage!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
