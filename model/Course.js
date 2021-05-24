require ('./db')
const mongoose = require ('mongoose')
const Schema = mongoose.Schema;

//subdocument modules schema
// const moduleFileSchema = new Schema ({

//         fileID: String,
//         filename:String,
//         description:String
// })

 const moduleSchema = new Schema ({
         moduleNumber:String, 
         description:String, 
//         moduleFiles:[moduleFileSchema]
 })

const courseSchema = new Schema ({
        courseName: String,
        description: String,
        keywords: String, 
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
        modules: [moduleSchema],
})




module.exports = mongoose.model ('Course', courseSchema, 'courses')
// module.exports = mongoose.model ('ModuleFile', moduleFileSchema, 'modulefiles')
//module.exports = mongoose.model ('Module', moduleSchema, 'modules')
