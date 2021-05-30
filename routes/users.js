const User = require ('../model/User')
const express = require('express')
const router = express.Router()

/* get list of all users */
router.get('/', async (req, res) => {
    let data = await User.find({})
    console.info(`records retrieved from mongoose:`, data?.length)
    res.send(data);
})

/* get user by ID */
router.get('/:userID', async (req, res) => {
    let data = await User.findOne({userID: req.params.userID})
    try {
        console.info(`User retrieved from mongoose:`, data)
        res.send(data);
    }
    catch (error) {
        console.error(error)
        res.sendStatus(500)
      }
})


/* add a User*/
router.post ('/', async (req, res) => {
    let userToCreate = req.body
    try {
      let newUser = new User(userToCreate)
      await newUser.save()
      console.log("Created User", newUser)
      res.send(newUser)  
    }
    catch (error) {
      console.log(error)
      res.sendStatus(500)
    }
})

/* Update a user by ID. */
router.put('/:id', async function(req, res) {
    let userToUpdate = req.body
    try {
      let data = await User.findByIdAndUpdate(req.params.id, userToUpdate);
      console.log("Updated User", data)
      res.send(data);
    }
    catch(error) {
      console.log(error)
      res.sendStatus(500)
    }
})

/* Delete a User by ID. */
router.delete("/:id", async (req, res) => {
    try {
      const data = await User.findByIdAndDelete(req.params.id);
  
      if (!data) {
        res.sendStatus(404);
      } else {
        console.log("Deleted User", data);
        res.send(data);
      }
    } catch (error) {
      console.log(error)
      res.sendStatus(500)  }
})

module.exports = router