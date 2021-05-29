const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    console.log("Logout Request is: ", req.body)
    req.logout()
    res.clearCookie('connect.sid')
    res.send("You've been logged out")
    // res.redirect('/')
})

module.exports = router