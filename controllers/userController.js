const User = require('../models/userModel')
const Company = require('../models/companyModel')
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

exports.inviteTeamMember = async (req, res, next) => {
    try {
        //check if there is already a user registered with that email
        const userCheck = await User.find({ email: req.body.email })
        if (userCheck.length !== 0) return next(new CustomError('there is already a user with this email', 400))

        const company = await Company.findById(req.user.company)
        const inviteToken = await company.generateInvite(req.body.email, next)

        res.status(200).send({
            status: 'success',
            data: {
                inviteToken
            }
        })
    }
    catch (err) {
        next(err)
    }
}

exports.register = async (req, res, next) => {
    try {
        const company = await Company.findOne({ "invitations.inviteToken": req.params.inviteToken })
        if (!company) return next(new CustomError('this invite link is not valid', 400))

        const matchedInvite = company.invitations.find(invite => invite.inviteToken === req.params.inviteToken)

        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            company: company._id,
            email: matchedInvite.email
        })

        company.invitations = company.invitations.filter(invite => invite.inviteToken !== matchedInvite.inviteToken)

        await company.save()

        res.status(201).send({
            status: 'success',
            data: {
                user
            }
        })
    }
    catch (err) {
        next(err)
    }
}