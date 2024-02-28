const Year = require('../models/yearModel')

exports.createYear = async (req, res, next) => {
    try {
        const year = await Year.create({
            ...req.body,
            company: req.user.company
        })
        res.status(201).send({
            status: 'success',
            data: {
                year
            }
        })
    }
    catch (err) {
        next(err)
    }
}