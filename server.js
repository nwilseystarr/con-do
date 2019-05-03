const express = require("express");
const path = require("path");
const session = require("express-session");
// Our passport implementation
const passport = require("./db/config/passport")
// PORT and Models
const PORT = process.env.PORT || 3001;
const db = require("./db/models");
// Routes
const routes = require("./routes");

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


// require("./attendanceRoutes/apiRoutes")(app);
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





