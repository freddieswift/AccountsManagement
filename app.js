const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const viewRouter = require('./routes/viewRoutes')
const userRouter = require('./routes/userRoutes')
const errorHandler = require('./error/errorHandler')

const app = express()

app.use(express.json())

//DB CONNECTION
const clientPromise = require('./db/connectDatabase')

//SESSION SET UP
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    name: 'sessionID',
    store: MongoStore.create({
        clientPromise: clientPromise,
        ttl: 1 * 24 * 60 * 60 // 1 day
    })
}))

//ROUTES
app.use(viewRouter)
app.use('/api/v1/users', userRouter)

//ERROR HANDLER
app.use(errorHandler)

module.exports = app