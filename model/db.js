const MongoClient = require('mongodb').MongoClient

const dbUrl = 'mongodb+srv://project2_user:WiseWhales@evolveu.oaffh.mongodb.net/project2_database?retryWrites=true&w=majority'
const databaseName = 'project2_database'

let connectMongoClient = MongoClient.connect(dbUrl, { useUnifiedTopology: true })

let getDb = connectMongoClient.then((client) => {
    return client.db(databaseName)
})

function getCollection(name) {
    return getDb.then((db) => {
        return db.collection(name)
    })
}

function close() {
    return connectMongoClient.then((client) => {
        return client.close()
    })
}

module.exports = {
    getDb,
    getCollection,
    close
}