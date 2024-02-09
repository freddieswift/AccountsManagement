const CustomError = require('./customError')

const handleAPIError = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
}

const handleWebsiteError = (err, res) => {
    if (err.statusCode === 401) {
        // TODO if 
        return res.status(err.statusCode).send({
            page: "login page",
            message: err.message
        })
    }
    return res.status(err.statusCode).send({
        page: "error",
        message: err.message
    })
}

module.exports = errorHandler = (err, req, res, next) => {
    console.log(err)

    let error
    if (err instanceof CustomError) {
        error = err
    }
    else {
        error = new CustomError('Something went very wrong...', 500)

        if (err.name === 'ValidationError') {
            error = new CustomError('Please provide the missing values <INSERT HERE>', 400)
        }
        if (err.code === 11000) {
            error = new CustomError('There is is already a <SOMETHING> with this <SOMETHING>, please try another one', 400)
        }
    }

    if (req.url.startsWith('/api')) {
        return handleAPIError(error, res)
    }
    handleWebsiteError(error, res)
}

