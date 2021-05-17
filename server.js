require ('dotenv').config()
const express = require('express')
const app = express()
const users = require ('./routes/users')
const courses = require ('./routes/courses')
const carts = require ('./routes/carts')
const cors = require ('cors')

app.use(express.json()) //JSON Parser
app.use('/users', users)
app.use('/courses', courses)
app.use('/carts', carts)

//Set PORT
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`)
})