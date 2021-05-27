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
    console.log("GridFSbucket", gridFSbucket)

    streamifier.createReadStream(filedata)
        .pipe(gridFSbucket.openUploadStream(filename))
        .on('error', (error) => { console.log('error writing picture') })
        .on('finish', (file) => {
            res.send(file)
        })

})

router.get('/download/:fileID', (req, res) => {
    let gridFSbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        chuckSizeBytes: 1024,
        bucketName: 'courseMaterial'
    
    })
    const downloadID = mongoose.Types.ObjectId(req.params.fileID);
    
    let findCursor = gridFSbucket.find({_id: req.params.fileID})
    
    findCursor.toArray()
        .then((results) => {
            console.log(results)
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
    console.log(pictureID)
    //const pictureID = new ObjectId(req.params.fileID);

    //find file associated with fileID
    let filename = gridFSbucket.find({_id: req.params.fileID})
    console.log(filename.filename)

    gridFSbucket.openDownloadStream(pictureID)
        .pipe(res);

     
//const pictureStream = gridFSbucket.readByID(pictureID)
    //pictureStream.on('error', (err) => {callback (err,null)})
    
    //Pass object stream straight back to browser    
    //pictureStream.pipe(res)
    //res.send("get called")
    console.log("get called")
});

router.delete('/delete/:fileID', (req,res) => {

    let gridFSbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
         chuckSizeBytes: 1024,
         bucketName: 'courseMaterial'
    })
        
     gridFSbucket.delete(req.params.fileID)
     res.send("file was deleted")
});



module.exports = router