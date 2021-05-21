const TeacherUser = require ('../model/TeacherUser')
const express = require('express')
const router = express.Router()

/* get list of all users */
router.get('/', async (req, res) => {
    let data = await TeacherUser.find({})
    console.info(`records retrieved from mongoose:`, data?.length)
    res.send(data);
})

/* get user by ID */
router.get('/:id', async (req, res) => {
    let data = await TeacherUser.findOne({_id: req.params.id})
    try {
        console.info(`Teacher user retrieved from mongoose:`, data)
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
      let newUser = new TeacherUser(userToCreate)
      await newUser.save()
      console.log("Created Teacher User", newUser)
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
      let data = await TeacherUser.findByIdAndUpdate(req.params.id, userToUpdate);
      console.log("Updated Teacher User", data)
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
      const data = await TeacherUser.findByIdAndDelete(req.params.id);
  
      if (!data) {
        res.sendStatus(404);
      } else {
        console.log("Deleted Teacher User", data);
        res.send(data);
      }
    } catch (error) {
      console.log(error)
      res.sendStatus(500)  }
})

module.exports = router