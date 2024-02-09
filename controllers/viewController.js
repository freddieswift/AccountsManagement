exports.getHomepage = (req, res) => {
    res.send(`hello ${req.session.user}`)
}