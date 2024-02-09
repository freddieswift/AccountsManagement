const express = require('express')
const session = require('express-session')

const viewRouter = require('./routes/viewRoutes')
const userRouter = require('./routes/userRoutes')
//const { customErrorHandler, genericErrorHandler } = require('./error/errorHandlerTest')
const errorHandler = require('./error/errorHandler')

const app = express()

app.use(express.json())
app.use(session({
    secret: 'myverysecretsecret',
    resave: false,
    saveUninitialized: true,
    name: 'sessionID'
}))

app.use(viewRouter)
app.use('/api/v1/users', userRouter)

//app.use(customErrorHandler)
//app.use(genericErrorHandler)
app.use(errorHandler)

module.exports = app