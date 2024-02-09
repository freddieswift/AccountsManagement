exports.getHomepage = (req, res) => {
    res.send(`hello ${req.user.username}, you are ${req.user.age} years old`)
}