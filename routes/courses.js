const Course = require ('../model/Course')
const express = require('express')
const router = express.Router()

/* get list of all courses*/
router.get('/', async (req, res) => {
    let data = await Course.find({})
    console.info(`records retrieved from mongoose:`, data?.length)
    res.send(data);
})

/* add a course*/
router.post ('/', async (req, res) => {
    let courseToCreate = req.body
    try {
      let newCourse = new Course(courseToCreate)
      await newCourse.save()
      console.log("Created course", newCourse)
      res.send(newCourse)  
    }
    catch (error) {
      console.log(error)
      res.sendStatus(500)
    }

})

module.exports = router

