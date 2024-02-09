const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const viewRouter = require('./routes/viewRoutes')
const userRouter = require('./routes/userRoutes')
const errorHandler = require('./error/errorHandler')

const app = express()

app.use(express.json())

//DB CONNECTION
const clientPromise = require('./db/connectDatabase')

//SESSION
app.use(session({
    secret: 'myverysecretsecret',
    resave: false,
    saveUninitialized: true,
    name: 'sessionID',
    store: MongoStore.create({
        clientPromise: clientPromise,
        ttl: 20
    })
}))

//ROUTES
app.use(viewRouter)
app.use('/api/v1/users', userRouter)

//ERROR HANDLER
app.use(errorHandler)

module.exports = app