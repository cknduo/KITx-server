require ('./db')
const mongoose = require ('mongoose')
const Schema = mongoose.Schema;

const teacherUserSchema = new Schema ({
        firstName: String,
        lastName: String,
        address: String,
        city: String,
        province: String,
        postalCode: String,
        country: String,
        userID: String,
        accountType: String,
        coursesTeaching: { current: [String], draft: [String], archived: [String] }
},
{ versionKey: false }) // Removes Mongoose __v attribute in database

module.exports = mongoose.model ('TeacherUser', teacherUserSchema, 'users')