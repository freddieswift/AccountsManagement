const CustomError = require('../error/customError')
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

exports.getAllYears = async (req, res, next) => {
    try {
        const allYears = await Year.find({ company: req.user.company })
        res.send(allYears)
    }
    catch (err) {
        next(err)
    }
}