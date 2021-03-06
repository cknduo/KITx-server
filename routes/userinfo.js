const express = require('express')
const router = express.Router()
const User = require('../model/User')

router.get("/user", async (req, res) => {
    if (!req.user) {
        console.log("User Info Request Denied. No Authentication Detected")
    }
    else {
        const info = await User.findOne({ "userID": req.user.userID })
        try {
            res.send({ "userInfo": info, "userID": req.user.userID })
        }
        catch (error) {
            console.error(error)
        }
    }
})

module.exports = router