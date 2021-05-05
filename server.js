const express = require('express')
const app = express()
const users = require ('./routes/users')
const courses = require ('./routes/courses')
const cors = require ('cors')

app.use(express.json()) //JSON Parser
app.use('/', users)
app.use('/', courses)

//Set PORT
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`)
})