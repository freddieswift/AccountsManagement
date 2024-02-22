const path = require('path')

const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const viewRouter = require('./routes/viewRoutes')
const userRouter = require('./routes/userRoutes')
const companyRouter = require('./routes/companyRoutes')
const errorHandler = require('./error/errorHandler')

const app = express()

//SET UP VIEW ENGINE
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')));

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

app.use(express.json())

//ROUTES
app.use('/', viewRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/company', companyRouter)

//ERROR HANDLER
app.use(errorHandler)

module.exports = app