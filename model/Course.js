require ('./db')
const mongoose = require ('mongoose')
const Schema = mongoose.Schema;

const courseSchema = new Schema ({
        courseName: String,
        description: String,
        keywords: [String], 
        rating: Number,
        instructor: String,
        requiredKits: { kitName: String, kitDescription: String},
        coursePrice: Number, 
        preRequisites: [String]
        //maxEnrollment: 50
})

module.exports = mongoose.model ('Course', courseSchema, 'courses')
