const CourseMaterialRecords = require ('../model/CourseMaterialRecords')
const express = require('express')
const router = express.Router()

/* get list of all courses*/
router.get('/', async (req, res) => {
    let data = await CourseMaterialRecords.find({})
    console.info(`records retrieved from mongoose:`, data?.length)
    res.send(data);
})

/* get by ID */
router.get('/findByID/:id', async (req, res) => {
  let data = await CourseMaterialRecords.findOne({_id: req.params.id})
  try {
      console.info(`course retrieved from mongoose:`, data)
      res.send(data);
  }
  catch (error) {
      console.error(error)
      res.sendStatus(500)
    }
})

/* get by courseID */
router.get('/findByCourseID/:courseID', async (req, res) => {
  let data = await CourseMaterialRecords.find({courseID: req.params.courseID})
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
  let data = await CourseMaterialRecords.findOne({courseName: req.params.courseName})
  try {
      console.info(`course retrieved from mongoose:`, data)
      res.send(data);
  }
  catch (error) {
      console.error(error)
      res.sendStatus(500)
    }
})

/* Update file info by courseID */
router.put('/:courseID', async function(req, res) {
    let dataToUpdate = req.body
    console.log("dataToUpdate",dataToUpdate)
    try {
      let data = await CourseMaterialRecords.findOneAndUpdate({courseID:req.params.courseID}, dataToUpdate, {new:true, upsert:true});
      console.log("Updated course record", data)
      res.send(data);
    }
    catch(error) {
      console.log(error)
      res.sendStatus(500)
    }
})

router.post ('/addCourse', async (req, res) => {
  let courseToCreate = req.body
  try {
    let newCourse = new CourseMaterialRecords(courseToCreate)
    await newCourse.save()
    console.log("Created course added to Course Material Record DB", newCourse)
    res.send(newCourse)  
  }
  catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

module.exports = router