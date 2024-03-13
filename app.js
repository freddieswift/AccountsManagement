const path = require('path')

const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')

const viewRouter = require('./routes/viewRoutes')
const userRouter = require('./routes/userRoutes')
const companyRouter = require('./routes/companyRoutes')
const yearRouter = require('./routes/yearRoutes')
const errorHandler = require('./error/errorHandler')
const CustomError = require('./error/customError')

const app = express()

//SET UP VIEW ENGINE
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')));

//DB CONNECTION
require('./db/connectDatabase')

//SESSION SET UP
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    name: 'sessionID',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
    store: MongoStore.create({
        mongoUrl: mongoose.connections[0]._connectionString
    })
}))

app.use(express.json())

//ROUTES
app.use('/', viewRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/company', companyRouter)
app.use('/api/v1/year', yearRouter)

app.all('*', (req, res, next) => {
    next(new CustomError(`We can't find what you are looking for :(`, 404));
});
//ERROR HANDLER
app.use(errorHandler)

module.exports = app