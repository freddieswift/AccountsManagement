const User = require('../models/userModel')
const Company = require('../models/companyModel')
const CustomError = require('../error/customError')

const { sendInviteEmail, sendWelcomeEmail } = require('../email/email')

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
        await sendWelcomeEmail(user.email)
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

exports.register = async (req, res, next) => {
    try {
        const company = await Company.findOne({ "invitations.inviteToken": req.params.inviteToken }).select('+invitations')
        if (!company) return next(new CustomError('this invite link is not valid', 400))

        const matchedInvite = company.invitations.find(invite => invite.inviteToken === req.params.inviteToken)

        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            company: company._id,
            email: matchedInvite.email
        })

        req.session.username = user.username

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

exports.inviteTeamMember = async (req, res, next) => {
    try {
        //check if there is already a user registered with that email
        const userCheck = await User.find({ email: req.body.email })
        if (userCheck.length !== 0) return next(new CustomError('there is already a user with this email', 400))

        const company = await Company.findById(req.user.company)
        const inviteToken = await company.generateInvite(req.body.email, next)

        const inviteURL = `${req.protocol}://${req.get('host')}/register/${inviteToken}`

        await sendInviteEmail(req.body.email, inviteURL)

        res.status(201).send({
            status: 'success',
            message: 'user invited created',
            data: {
                inviteToken
            }
        })
    }
    catch (err) {
        next(err)
    }
}

exports.deleteInvite = async (req, res, next) => {
    const inviteID = req.params.inviteID
    try {
        const company = await Company.findOne({ _id: req.user.company._id }).select('+invitations')
        const invite = company.invitations.find(({ _id }) => _id.toString() === inviteID)
        if (!invite) return next(new CustomError('cannot find this invite', 404))
        company.invitations = company.invitations.filter(({ _id }) => _id.toString() !== inviteID)
        await company.save()
        res.status(200).send({
            status: 'success',
            message: 'invited deleted'
        })
    }
    catch (err) {
        next(err)
    }
}

exports.resendInvite = async (req, res, next) => {
    const inviteID = req.params.inviteID
    try {
        //check if the invite is for the user's company and if invite exists
        const company = await Company.findOne({ _id: req.user.company._id }).select('+invitations')
        const invite = company.invitations.find(({ _id }) => _id.toString() === inviteID)
        if (!invite) return next(new CustomError('cannot find this invite', 404))
        const inviteURL = `${req.protocol}://${req.get('host')}/register/${invite.inviteToken}`
        await sendInviteEmail(invite.email, inviteURL)
        res.status(200).send({
            status: 'success',
            message: 'invitation email has been resent'
        })
    }
    catch (err) {
        next(err)
    }
}