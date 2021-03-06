const Auth = require('../model/Authentication')
const User = require('../model/User')
const express = require('express')
const router = express.Router()
const bcrypt = require("bcryptjs")

//Student profile
createNewStudent = async (req, exportedID) => {

  let newStudent = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    city: req.body.city,
    province: req.body.province,
    postalCode: req.body.postalCode,
    country: req.body.country,
    userID: exportedID,
    accountType: req.body.accountType,
    coursesLearning: { enrolled: [], bookmarked: [], completed: [] }
  })

  newStudent = await newStudent.save()

  return newStudent
}

//Teacher profile
createNewTeacher = async (req, exportedID) => {
  const newTeacher = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    city: req.body.city,
    province: req.body.province,
    postalCode: req.body.postalCode,
    country: req.body.country,
    userID: exportedID,
    accountType: req.body.accountType,
    coursesTeaching: { current: [], draft: [], archived: [] }
  })

  newTeacher = await newTeacher.save()

  return newTeacher
}

router.post("/", (req, res) => {
  console.log("Register Request is: ", req.body)
  Auth.findOne({ username: req.body.username }, async (err, doc) => {

    if (err) throw err
    if (doc) res.send({ "error": "User Already Exists" })
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
            await createNewStudent(req, authAccount.id)
            const info = await User.findOne({ "userID": authAccount.id })
            res.send({ "msg": "User Created and Successfully Authenticated", "userInfo": info, "userID": authAccount.id })
          }

          //Create Teacher profile
          if (req.body.accountType === "teacher") {
            await createNewTeacher(req, authAccount.id)
            const info = await User.findOne({ "userID": authAccount.id })
            res.send({ "msg": "User Created and Successfully Authenticated", "userInfo": info, "userID": authAccount.id })
          }

        }
      })
    }
  })
    .catch((err) => {
      res.status(500).json(err)
    })
})

module.exports = router