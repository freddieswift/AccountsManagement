const Year = require('../models/yearModel')
const Company = require('../models/companyModel')
const CustomError = require('../error/customError')

exports.homepage = async (req, res, next) => {
    try {
        const allYears = await Year.find({ company: req.user.company })
        res.status(200).render('homepage', {
            title: 'Homepage',
            user: req.user,
            years: allYears
        })
    }
    catch (err) {
        next(err)
    }
}

exports.admin = async (req, res, next) => {
    try {
        const company = await Company.findOne({ _id: req.user.company._id }).select('+invitations')
        res.status(200).render('admin', {
            title: 'Admin',
            user: req.user,
            invitations: company.invitations
        })
    }
    catch (err) {
        next(err)
    }
}

exports.login = (req, res, next) => {
    if (req.session.username) {
        return res.redirect('/')
    }
    res.status(200).render('login', {
        title: 'Login'
    })
}

exports.signup = (req, res, next) => {
    if (req.session.username) {
        return res.redirect('/')
    }
    res.status(200).render('signup', {
        title: 'Sign Up'
    })
}

exports.createCompany = (req, res, next) => {
    if (req.user.company) {
        return res.redirect('/')
    }
    res.status(200).render('createCompany', {
        title: 'Create Company'
    })
}

exports.register = async (req, res, next) => {
    const company = await Company.findOne({ "invitations.inviteToken": req.params.inviteToken }).select('+invitations')
    if (!company) return next(new CustomError('this invite link is not valid', 400))
    const matchedInvite = company.invitations.find(invite => invite.inviteToken === req.params.inviteToken)

    res.status(200).render('register', {
        title: 'Register',
        email: matchedInvite.email
    })
}

exports.yearPage = async (req, res, next) => {
    const yearID = req.params.id
    try {
        const year = await Year.findOne({ _id: yearID, company: req.user.company._id })
        console.log(year)
        res.status(200).render('year', {
            title: year.name,
            user: req.user,
            year: year
        })
    }
    catch (err) {
        next(err)
    }
}