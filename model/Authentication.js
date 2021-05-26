require('./db')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authSchema = new Schema({
  username: String,
  password: String
},
  { versionKey: false }) // Removes Mongoose __v attribute in database

module.exports = mongoose.model('Authentication', authSchema, 'authentication')