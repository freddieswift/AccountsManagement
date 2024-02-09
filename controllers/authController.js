const CustomError = require('../error/customError')
const User = require('../models/userModel')

exports.isLoggedIn = async (req, res, next) => {
    if (!req.session.username) {
        return next(new CustomError("please login", 401))
    }
    const user = await User.findOne({ username: req.session.username })
    req.user = user
    next()
}

exports.login = async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    if (!username || !password) {
        return next(new CustomError('please provide username and password', 400))
    }

    try {
        const user = await User.findOne({ username: username }).select('+password')

        if (!user) return next(new CustomError('invalid credentials', 401))

        if (user.password !== password) return next(new CustomError('invalid credentials', 401))

        user.password = undefined

        req.session.username = username

        res.status(200).send({
            status: "success",
            data: {
                user
            }
        })
    }
    catch (err) {
        next(err)
    }
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
