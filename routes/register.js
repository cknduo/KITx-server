const Auth = require ('../model/Authentication')
const express = require('express')
const router = express.Router()
const bcrypt = require("bcryptjs")

router.post("/", (req, res) => {
  console.log("Register Request is: ", req.body)
    Auth.findOne({ username: req.body.username }, async (err, doc) => {
      if (err) throw err
      if (doc) res.send("User Already Exists")
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newAccount = new Auth({
          username: req.body.username,
          password: hashedPassword,
        });
        await newAccount.save()
        res.send("User Created")
      }
    })
  })

module.exports = router