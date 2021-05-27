const express = require('express')
const router = express.Router()
const passport = require("passport")
const User = require('../model/User')

router.post("/", async (req, res, next) => {
  console.log("Login Request is: ", req.body)
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err
    if (!user) res.send("Invalid Username/Password or No User Exists")
    else {
      req.logIn(user, async (err) => {
        if (err) throw err
        const info = await User.findOne({ "userID": user._id })
        res.send({ "msg": "Successfully Authenticated", "userInfo": info, "userID": user._id })
      })
    }
  })(req, res, next)
})

module.exports = router