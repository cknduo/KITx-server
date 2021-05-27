const express = require('express')
const router = express.Router()
const passport = require("passport")

router.post("/", (req, res) => {
    console.log("Login Request is: ", req.body)
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err
        if (!user) res.send("Invalid Username/Password or No User Exists")
        else {
            req.logOut()
            res.send("You've been logged out")
        }
    })
})

module.exports = router