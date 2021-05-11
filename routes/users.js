const User = require ('../model/User')
const express = require('express')
const router = express.Router()

/* get list of all users */
router.get('/', async (req, res) => {
    let data = await User.find({})
    console.info(`records retrieved from mongoose:`, data?.length)
    res.send(data);
})

module.exports = router