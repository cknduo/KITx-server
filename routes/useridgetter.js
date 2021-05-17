const express = require('express')
const router = express.Router()

router.get("/user", (req, res) => {
    res.send(req.user) // The req.user stores the entire user that has been authenticated inside of it.
  })

  module.exports = router