const express = require('express')
const router = express.Router()
const db = require('../model/db')
const ObjectId = require('mongodb').ObjectId;

async function getCoursesCollection() {
    return db.getCollection("courses")
}

async function findUser(name) {

    let collection = await getUsersCollection()
    let cursor = collection.findOne( {"courseName" : name})
    
    return cursor
}

router.get('/courses/list', async (request, response) => {
    let collection = await getCoursesCollection()
    let cursor = collection.find({})
    let courseList = await cursor.toArray()
    response.send(courseList)
    console.log(courseList)
    return courseList  
})

module.exports = router

