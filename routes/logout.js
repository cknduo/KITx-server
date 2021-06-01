const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    if (!req.user) res.send("You are already logged out")
    else {
        console.log("Logout Request from: ", req.user)
        req.logout()
        res.clearCookie('connect.sid') //Clear the browser cookie to remove authenticated token
        res.send("Logged Out")
    }
})

module.exports = router