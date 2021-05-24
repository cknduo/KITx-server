require ('./db')
const mongoose = require ('mongoose')
const Schema = mongoose.Schema;

const courseMaterialRecordsSchema = new Schema ({
        courseID: String,
        courseImage: {fileID: String, filename:String, description:String},
        kitImage: {fileID: String, filename:String, description:String},
        certificate: {fileID: String, filename:String, description:String},
        modules: {
                moduleNumber:String, 
                description:String, 
                moduleFiles: { 
                        fileID: String,
                        filename:String,
                        description:String}
                }
})

module.exports = mongoose.model ('CourseMaterialRecords', courseMaterialRecordsSchema, 'courseMaterialRecords')
