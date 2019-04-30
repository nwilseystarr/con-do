const express = require("express");
const path = require("path");
const session = require("express-session");
// Our passport implementation
const passport = require("./db/config/passport")
// PORT and Models
const PORT = process.env.PORT || 3001;
const db = require("./db/models");
const routes = require("./routes");

let app = express();

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true,
  cookie : { secure : false, maxAge : (4 * 60 * 60 * 1000) }}));
app.use(passport.initialize());
app.use(passport.session());
// passport.serializeUser(function(user, cb) {
//   cb(null, user.id);
// });

// passport.deserializeUser(function(id, cb) {
//   User.findById(id, function(err, user) {
//     cb(err, user);
//   });
// });

app.use(routes);
app.use( (req, res, next) => {
  console.log('req.session', req.session);
  next()
});


require("./attendanceRoutes/apiRoutes")(app);
// require("./attendanceRoutes/htmlRoutes")(app);

db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
});
// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});





