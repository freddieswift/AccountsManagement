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

exports.restrictTo = (role) => {
    return (req, res, next) => {
        if (role !== req.user.role) {
            return next(new CustomError("you do not have permission to perform this action", 403))
        }
        next()
    }
}

exports.hasCompany = async (req, res, next) => {
    if (!req.user.company) {
        return next(new CustomError('You must create a company before accessing this feature', 403))
    }
    req.user = await req.user.populate('company')
    next()
}

exports.login = async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        return next(new CustomError('please provide username and password', 400))
    }

    try {
        const user = await User.findOne({ username: req.body.username }).select('+password')
        if (!user) return next(new CustomError('invalid credentials', 401))
        await user.checkPassword(req.body.password)
        req.session.username = user.username
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