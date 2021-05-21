require ('./db')
const mongoose = require ('mongoose')
const Schema = mongoose.Schema;

const courseMaterialRecordsSchema = new Schema ({
        fileID: String,
        courseID: String,
        fileUse: String, 
        moduleNumber: String,
        description: String
})

module.exports = mongoose.model ('CourseMaterialRecords', courseMaterialRecordsSchema, 'courseMaterialRecords')
