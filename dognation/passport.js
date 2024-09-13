const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const helper = require("../helpers/helper");

// Set up the Passport strategy:
passport.use(
  new LocalStrategy((username, password, done) => {
    helper.findByUsername(username, async (err, user) => {

      const matchedPassword = await bcrypt.compare(password, user.password)

      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (user.password != matchedPassword) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  helper.findById(id, function(err, user) {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});
