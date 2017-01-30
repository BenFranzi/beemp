const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user.js')

module.exports = (passport) => {
  // === SETUP ===
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })


  // === REGISTER ===
  passport.use('local-register', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, email, password, done) => {
          process.nextTick(() => {
            User.findOne({$or:[ {'local.email': email}, {'local.username': req.body.username}]}, (err, user) => {
              if (err) {
                  return done(err)
              } else if (user) {
                  return done(null, false, req.flash('signupMessage', 'That email is already taken.'))
              } else {
                  //Make a new user
                  var newUser              = new User()
                  newUser.local.first_name = req.body.first_name
                  newUser.local.last_name  = req.body.last_name
                  newUser.local.username   = req.body.username
                  newUser.local.email      = req.body.email
                  newUser.local.password   = newUser.generateHash(password)
                  newUser.save((err) => {
                      if (err) {
                          throw err
                      }
                      return done(null, newUser)
                  })
              }
          })
          })
      }))

    // === login ===
    passport.use('local-login', new LocalStrategy(
    {
        usernameField           : 'username',
        passwordField           : 'password',
        passReqToCallback       : true
    },
    (req, username, password, done) => {
        User.findOne({ 'local.username' : username}, (err, user) => {
          if (err) {
            console.log(err)
            return done(err)
          }
          if (!user) {
            return done(null, false, req.flash('loginMessage', 'No user found'))
          }
          if (! user.validPassword(password)) {
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password'))
          }
          return done(null, user)
        })
    }
    ))
}
