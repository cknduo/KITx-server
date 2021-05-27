const Auth = require('./model/Authentication')
const bcrypt = require("bcryptjs")
const localStrategy = require("passport-local").Strategy

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      Auth.findOne({ username: username }, (err, user) => {
        if (err) throw err
        if (!user) return done(null, false)
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err
          if (result === true) {
            return done(null, user)
          } else {
            return done(null, false)
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id)
  })

  passport.deserializeUser((id, cb) => {
    Auth.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.username,
        userID: user.id
      };
      cb(err, userInformation)
    });
  });
};