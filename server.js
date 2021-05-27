require ('dotenv').config()
const express = require('express')
const app = express()

// Route Requirements [Express Router]
const courseMaterial = require('./routes/courseMaterial')
const courseMaterialRecords = require('./routes/courseMaterialRecords')
const users = require ('./routes/users')
const courses = require ('./routes/courses')
const carts = require ('./routes/carts')
const login = require ('./routes/login')
const logout = require ('./routes/logout')
const register = require ('./routes/register')
const userinfo = require ('./routes/userinfo')

// Middleware Requirements
const fileUpload = require("express-fileupload")
const cors = require ('cors')
const passport = require("passport")
const passportLocal = require("passport-local").Strategy
const cookieParser = require("cookie-parser")
const session = require("express-session")

// Middleware
app.use(express.json()) //JSON Parser
app.use(fileUpload())
app.use(
  cors({
    origin: "http://localhost:4444", // <-- location of the react app we're connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

// Routes [Express Router]
app.use('/users', users)
app.use('/courseMaterial', courseMaterial)
app.use ('/courseMaterialRecords', courseMaterialRecords)
app.use('/courses', courses)
app.use('/carts', carts)
app.use('/login', login)
app.use('/logout', logout)
app.use('/register', register)
app.use('/userinfo', userinfo)

//Set PORT
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`)
})