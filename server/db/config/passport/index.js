const passport = require("passport")
const LocalStrategy = require("./localStrategy")

var db = require("../../models");

//boilerplate code for keeping track of the user's auth status with the session
passport.serializeUser((user, done)=>{
    // console.log("serielizing user")
    // console.log(user)
    done(null, user.id)
})

passport.deserializeUser((id, done)=>{
    // console.log("deserielizing user")
    db.User.findOne({
        where: {
          id: id
        }
      }).then((user)=> {
          done(null, user)
        }).catch(done);
})
//using the local strategy that we've configured
passport.use(LocalStrategy)

module.exports = passport