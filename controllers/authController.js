const CustomError = require('../error/customError')
const User = require('../models/userModel')

exports.isLoggedIn = (req, res, next) => {
    if (!req.session.username) {
        return next(new CustomError("please login", 401))
    }
    next()
}

exports.login = (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    if (!username || !password) {
        return next(new CustomError('please provide username and password', 400))
    }

    if (username !== "test" || password !== "test") {
        return next(new CustomError("incorrect credentials", 401))
    }


    req.session.username = username
    console.log("hello")
    res.status(200).send({
        status: "success",
        data: {
            username
        }
    })
}

exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        res.clearCookie('sessionID', { path: '/' })
        res.send()
    })
}

exports.createUser = (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    const user = new User({
        username: username,
        password: password
    })

    user.save()
        .then(doc => {
            console.log(doc)
            res.send(doc)
        })
        .catch(err => {
            next(err)
        })
}
