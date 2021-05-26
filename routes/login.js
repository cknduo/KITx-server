const express = require('express')
const router = express.Router()
const passport = require("passport")

router.post("/", (req, res, next) => {
  console.log("Login Request is: ", req.body)
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err
    if (!user) res.send("Invalid Username/Password or No User Exists")
    else {
      req.logIn(user, (err) => {
        if (err) throw err
        res.send({msg: "Successfully Authenticated", user: user}) //Send user object as part of response
      });
    }
  })(req, res, next)
})

module.exports = router