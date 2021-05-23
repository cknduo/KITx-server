const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const fs = require('fs')
//const db = require ('../model/db')
//const fs = require('fs')
//const gridFSBucket = require ('../model/db')
const streamifier = require('streamifier')
const CourseMaterialRecords = require ('../model/CourseMaterialRecords')


router.post('/upload/:courseID/:fileUse/:sessionNumber', async (req, res) => {
    let filename = req.files.file.name
    let filedata = req.files.file.data
    let courseID = req.params.courseID
    let fileUse = req.params.fileUse
    let sessionNumber = req.params.sessionNumber

    console.log ('courseID,fileUse,sessionNumber', courseID, fileUse, sessionNumber)

    let currentfileID
    
    //initalize gridFSBucket stream
    let gridFSbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        chuckSizeBytes: 1024,
        bucketName: 'courseMaterial'
    
    })

    //store file
    console.log("GridFSbucket", gridFSbucket)

    streamifier.createReadStream(filedata)
        .pipe(gridFSbucket.openUploadStream(filename))
        .on('error', (error) => { console.log('error writing picture') })
        .on('finish', (file) => {
            console.log('done!')
            currentfileID = file._id
            console.log('filename after post',currentfileID)
            createRecord()
            res.send(currentfileID)
        })

    async function createRecord () {    
    //record filenameID and courseMaterial information into courseMaterialRecords
    let courseMaterialRecordToCreate = {
        fileID: currentfileID,
        courseID: req.params.courseID,
        fileUse: req.params.fileUse,
        sessionNumber: req.params.sessionNumber,
        description:""
    }    

    try {
          let newCourseMaterialRecord = new CourseMaterialRecords(courseMaterialRecordToCreate)
          await newCourseMaterialRecord.save()
          console.log("Created new course material", newCourseMaterialRecord)
          //res.send(newCourseMaterialRecord)  
    }
        catch (error) {
          console.log(error)
          //res.sendStatus(500)
        }

    }    
})

router.get('/download/', (req, res) => {
    let gridFSbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        chuckSizeBytes: 1024,
        bucketName: 'courseMaterial'
    
    })
    console.log("GridFSbucket", gridFSbucket)
    gridFSbucket.openDownloadStreamByName('jaguar.jpg')
        .pipe(fs.createWriteStream('./jaguar.jpg'))
        .on('error', (error) => { console.log('error writing picture') })
        .on('finish', () => {
            console.log('done downloading!')
            res.send('Done downloading')
        })
})


module.exports = router