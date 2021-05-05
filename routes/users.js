const express = require('express')
const router = express.Router()
const db = require('../model/db')
const ObjectId = require('mongodb').ObjectId

async function getUsersCollection() {
    return db.getCollection("users")
}

async function findUser(name) {

    let collection = await getUsersCollection()
    let cursor = collection.findOne( {"firstName" : name})
    
    return cursor
}

router.get('/users/list', async (request, response) => {
    let collection = await getUsersCollection()
    let cursor = collection.find({})
    let userList = await cursor.toArray()
    response.send(userList)
    console.log(userList)
    return userList  
})

module.exports = router