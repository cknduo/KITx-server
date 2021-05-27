const express = require('express')
const router = express.Router()
const User = require('../model/User')

router.get("/user", async (req, res) => {
  console.log("User ID to find info with is: ", req.user.userID)
  const info = await User.findOne({ userID: req.user.userID })
    console.log("User info from Mongoose is: ", info)
    res.send({ "userInfo": info, "userID": req.user.userID })
  })

module.exports = router