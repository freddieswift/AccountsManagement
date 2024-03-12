const Year = require('../models/yearModel')

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
        res.status(200).render('admin', {
            title: 'Admin',
            user: req.user
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