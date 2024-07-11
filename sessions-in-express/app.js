const express = require("express");
const app = express();

const session = require("express-session")

const PORT = process.env.PORT || 4001;

const store = new session.MemoryStore();

app.use(
  session({
    secret: "tEsting",
    cookie: { maxAge: 172800000, secure: true, sameSite: 'none' },
    resave: false,
    saveUninitialized: false,
    store
  })
)

// logging in function
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.users.findByUsername(username, (err, user) => {
    if (!user) return res.status(403).json({ msg: "No user found!" });
    if (user.password === password) {
      // Add your authenticated property below:
      req.session.authenticated = true;
      // Add the user object below:
      req.session.user = { username, password }
      // Log the session below:
      console.log(req.session);
      res.redirect("/shop");
    } else {
      res.status(403).json({ msg: "Bad Credentials" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
