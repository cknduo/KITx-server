const Auth = require('../model/Authentication')
const StudentUser = require('../model/StudentUser')
const TeacherUser = require('../model/TeacherUser')
const express = require('express')
const router = express.Router()
const bcrypt = require("bcryptjs")

//Student profile
createNewStudent = (req, exportedID) => {

  const newStudent = new StudentUser({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    city: req.body.city,
    province: req.body.province,
    postalCode: req.body.postalCode,
    country: req.body.country,
    userID: exportedID,
    coursesLearning: { enrolled: [], bookmarked: [], completed: [] }
  })

  newStudent.save()
}

//Teacher profile
createNewTeacher = (req, exportedID) => {
  const newTeacher = new TeacherUser({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    city: req.body.city,
    province: req.body.province,
    postalCode: req.body.postalCode,
    country: req.body.country,
    userID: exportedID,
    coursesTeaching: { current: [], draft: [], archived: [] }
  })

  newTeacher.save()
}

router.post("/", (req, res) => {
  console.log("Register Request is: ", req.body)
  Auth.findOne({ username: req.body.username }, async (err, doc) => {

    if (err) throw err
    if (doc) res.send("User Already Exists")
    if (!doc) {
      // Create Authentication Profile
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const newAccount = new Auth({
        username: req.body.username,
        password: hashedPassword,
      })
      await newAccount.save(async (err, authAccount) => {
        if (err) throw err

        else {
          let accountID = authAccount.id

          //Create Student profile
          if (req.body.accountType === "student") {
            await createNewStudent(req, accountID)
          }

          //Create Teacher profile
          if (req.body.accountType === "teacher") {
            await createNewTeacher(req, accountID)
          }

          res.send("User Created")
        }
      })
    }
  })
    .catch((err) => {
      res.status(500).json(err)
    })
})

module.exports = router