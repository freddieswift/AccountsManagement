exports.getHomepage = (req, res, next) => {
    res.status(200).render('homepage', {
        title: 'Homepage',
        companyName: req.user.company.name
    })
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