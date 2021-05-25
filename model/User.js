require ('./db')
const mongoose = require ('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
        firstName: String,
        lastName: String,
        address: String,
        city: String,
        province: String,
        postalCode: String,
        country: String,
        userID: String,
        accountType: String,
        coursesLearning: { enrolled: [String], bookmarked: [String], completed: [String] },
        coursesTeaching: { current: [String], draft: [String], archived: [String] }

},
{ versionKey: false }) // Removes Mongoose __v attribute in database

module.exports = mongoose.model ('User', UserSchema, 'users')