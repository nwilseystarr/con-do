// const User = require("../../models/User");
const LocalStrategy = require("passport-local").Strategy;

var db = require("../../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
const strategy = new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email"
  },
  function(email, password, done) {
    // When a user tries to sign in this code runs
    console.log(email, " ", password)
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function(dbUser) {
      // If there's no user with the given email
      
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        // console.log(dbUser);
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
)

module.exports = strategy

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
//   console.log("serielizing user")
// });

// passport.deserializeUser(function(id, done) {
//   console.log("deserializing user")
//   db.User.findOne({
//     where: {
//       id: id
//     }
//   }).then(function(err, dbUser){
//     done(err, dbUser)
//   })
// });

// // Exporting our configured passport
// module.exports = passport;
