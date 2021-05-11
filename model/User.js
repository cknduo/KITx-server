require ('./db')
const mongoose = require ('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema ({
        firstName: String,
        lastName: String,
        address: String,
        city: String,
        province: String,
        postalCode: String,
        country: String,
        permissions: [String],
        coursesEnrolled: [String],
        coursesCompleted: [String],
        coursesResponsible: [String],
        coursesBookmarked: [String]
})

module.exports = mongoose.model ('User', userSchema, 'users')
