const Course = require ('../model/Course')
const express = require('express')
const router = express.Router()

/* get list of all courses*/
router.get('/', async (req, res) => {
    let data = await Course.find({})
    console.info(`records retrieved from mongoose:`, data?.length)
    res.send(data);
})

/* get course by ID */
router.get('/:id', async (req, res) => {
  let data = await Course.findOne({_id: req.params.id})
  try {
      console.info(`course retrieved from mongoose:`, data)
      res.send(data);
  }
  catch (error) {
      console.error(error)
      res.sendStatus(500)
    }
})

/* get course by instructor */
router.get('/findByTeacher/:instructorID', async (req, res) => {
  let data = await Course.find({instructorID: req.params.instructorID})

  try {
      console.info(`course retrieved from mongoose:`, data)
      res.send(data);
  }
  catch (error) {
      console.error(error)
      res.sendStatus(500)
    }
})


/* get course name */
router.get('/findByName/:courseName', async (req, res) => {
  let data = await Course.findOne({courseName: req.params.courseName})
  try {
      console.info(`course retrieved from mongoose:`, data)
      res.send(data);
  }
  catch (error) {
      console.error(error)
      res.sendStatus(500)
    }
})


/* add a course*/
router.post ('/addCourse', async (req, res) => {
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

/* Update course by ID. */
router.put('/:id', async function(req, res) {
  let courseToUpdate = req.body
  try {
    let data = await Course.findByIdAndUpdate(req.params.id, courseToUpdate);
    console.log("Updated Course", data)
    res.send(data);
  }
  catch(error) {
    console.log(error)
    res.sendStatus(500)
  }
})

/* Delete a Course by ID. */
router.delete("/:id", async (req, res) => {
  try {
    const data = await Course.findByIdAndDelete(req.params.id);

    if (!data) {
      res.sendStatus(404);
    } else {
      console.log("Deleted Course", data);
      res.send(data);
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)  }
})

module.exports = router