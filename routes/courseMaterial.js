const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const fs = require('fs')
const streamifier = require('streamifier')


router.post('/upload/', async (req, res) => {
    let filename = req.files.file.name
    let filedata = req.files.file.data

    //initalize gridFSBucket stream
    let gridFSbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        chuckSizeBytes: 1024,
        bucketName: 'courseMaterial'
    })

    //store file
    //console.log("GridFSbucket", gridFSbucket)

    streamifier.createReadStream(filedata)
        .pipe(gridFSbucket.openUploadStream(filename))
        .on('error', (error) => { console.log('error writing picture') })
        .on('finish', (file) => {
            res.send(file)
        })

})

router.get('/download/:fileID', async (req, res) => {
    let gridFSbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        chuckSizeBytes: 1024,
        bucketName: 'courseMaterial'
    
    })
    const downloadID = mongoose.Types.ObjectId(req.params.fileID);
    
    let findCursor = gridFSbucket.find({_id: req.params.fileID})
    
    findCursor.toArray()
        .then((results) => {
        })



    res.send("")
    /*gridFSbucket.openDownloadStream(downloadID)
        .pipe(fs.createWriteStream(`c:\kitx\${fileID/jaguar.jpg'))
        .on('error', (error) => { console.log('error writing picture') })
        .on('finish', () => {
            console.log('done downloading!')
            res.send('Done downloading')
        })*/
})

router.get('/image/:fileID', (req,res) => {

    let gridFSbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
         chuckSizeBytes: 1024,
         bucketName: 'courseMaterial'
    })
    
    const pictureID = mongoose.Types.ObjectId(req.params.fileID);
    //const pictureID = new ObjectId(req.params.fileID);

    //find file associated with fileID
    //let filename = gridFSbucket.find({_id: req.params.fileID})
    //console.log(filename.filename)

    //Pass object stream straight back to browser    
    gridFSbucket.openDownloadStream(pictureID)
        .pipe(res);

});


router.delete('/delete/:fileID', async (req,res) => {

    let gridFSbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
         chuckSizeBytes: 1024,
         bucketName: 'courseMaterial'
    })

    const fileID = mongoose.Types.ObjectId(req.params.fileID)
    let fileCheck 

     let cursor = await gridFSbucket.find({_id: fileID})
     cursor.toArray()
        .then((results) => {
            fileCheck = results.length
            console.log(`length is ${fileCheck}, looking for ${fileID}`)

            if (fileCheck === 0) {
                console.log("File has already been removed from database")
                res.send ("File has already been removed from database")
            } else {
                gridFSbucket.delete(fileID)
                console.log(`File ${fileID} was deleted from database`)
                res.send (`File ${fileID} was deleted from database`)
            }      
    })

});



module.exports = router