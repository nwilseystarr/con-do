const express = require("express");
const path = require("path");
const session = require("express-session");
// Our passport implementation
const passport = require("./server/db/config/passport")
// PORT and Models
const PORT = process.env.PORT || 3001;
const db = require("./server/db/db");
const models = require("./server/db/models/")
// Routes
const routes = require("./server/routes");

let app = express();

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const bodyParser = require('body-parser');

app.use(express.json());

//allowing our server to keep track of the user's auth status with session
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());


app.use(routes);

const admin = {
  email: "admin@mail.com",
  password: "password",
  name: "admin account",
  userType: "admin",
  firstLog: false
}
const advisor = {
  email: "advisor@mail.com",
  password: "password",
  name: "advisor account",
  userType: "advisor",
  firstLog: false,
  // schoolId: 99,
}
const staff = {
  email: "staff@mail.com",
  password: "password",
  name: "staff account",
  userType: "staff",
  firstLog: false,
  // committeeId: 99,
}
const delegate = {
  email: "delegate@mail.com",
  password: "password",
  name: "delegate account",
  userType: "delegate",
  firstLog: false,
  // schoolId: 99,
  // committeeId: 99,
  // country: "none"
}

db.sync({ force: false}).then(function () {
  // models.User.create(admin).catch(err=> console.log(err))
  // models.User.create(advisor).catch(err=> console.log(err))
  // models.User.create(staff).catch(err=> console.log(err))
  // models.User.create(delegate).catch(err=> console.log(err))
  // models.School.create({name: "None"})
  // models.Committee.create({name: "None"})
  app.listen(PORT, function () {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
});
// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});