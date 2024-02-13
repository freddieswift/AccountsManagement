const User = require('../models/userModel')
const CustomError = require('../error/customError')
exports.createNewUser = async (req, res, next) => {
    //if user is already logged in, they already have an account 
    // and therefor need to use /team
    //to create a new team member
    if (req.session.username) {
        return next(new CustomError('you already have an account. please use /api/v1/users/team to create a new user for your company', 400))
    }
    req.body.role = 'admin'
    try {
        const user = await User.create({
            ...req.body
        })
        res.status(201).send({
            status: 'success',
            data: {
                user: user
            }
        })
    }
    catch (err) {
        next(err)
    }
}

exports.createTeamMember = async (req, res, next) => {
    try {
        const user = await User.create({
            ...req.body,
            companyID: req.user.companyID
        })
        res.status(201).send({
            status: 'success',
            data: {
                user: user
            }
        })
    }
    catch (err) {
        next(err)
    }
}