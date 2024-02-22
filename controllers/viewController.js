exports.getHomepage = (req, res, next) => {
    res.status(200).render('base', {
        title: 'homepage',
        tour: 'The forest hiker',
        user: 'john'
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