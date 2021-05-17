//const MongoClient = require('mongodb').MongoClient
const mongoose = require ('mongoose')
require ('dotenv').config()

// Moved to environment variable
// const dbUrl = 'mongodb+srv://project2_user:WiseWhales@evolveu.oaffh.mongodb.net/project2_database?retryWrites=true&w=majority'

const databaseName = 'project2_database'

// 11-May-2021:  Updated mongodb connection to mongoose connection
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;

db.once('open', (_) =>
  console.log('MongoDB is now connected:', `${process.env.MONGODB_URL}`)
)

db.on('error', (err) => console.error('MongoDB connection error!', err))