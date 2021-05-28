require ('./db')
const mongoose = require ('mongoose')
const Schema = mongoose.Schema;

const courseSchema = new Schema ({
        courseName: String,
        description: String,
        keywords: Array, 
        rating: Number,
        teacherID: String,
        studentIDs: Array,
        requiredKits: { kitName: String, kitDescription: String},
        coursePrice: Number, 
        preRequisites: Array,
        instructorID: String,
        courseStatus: String,
        courseImage: {fileID: String, filename:String, description:String},        
        certificate: {fileID: String, filename:String, description:String},        
        kitImage: {fileID: String, filename:String, description:String},        
        modules: [{moduleNumber:String, description:String}],
        moduleFiles: [{moduleNumber:String, fileID:String, description:String, filename:String}]

})




module.exports = mongoose.model ('Course', courseSchema, 'courses')
// module.exports = mongoose.model ('ModuleFile', moduleFileSchema, 'modulefiles')
//module.exports = mongoose.model ('Module', moduleSchema, 'modules')
