require('./db')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
        firstName: String,
        lastName: String,
        address: String,
        city: String,
        province: String,
        postalCode: String,
        country: String,
        userID: String,
        accountType: String
},
        { strict: false, versionKey: false }) // {versionKey: false} removes Mongoose __v attribute in database

module.exports = mongoose.model('User', userSchema, 'users')