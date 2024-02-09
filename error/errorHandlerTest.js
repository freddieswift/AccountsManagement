const CustomError = require('./customError')

const handleAPIError = (err, res, next) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
}

const handleWebsiteError = (err, res, next) => {
    if (err.statusCode === 401) {
        // TODO if 
        return res.status(401).send({
            page: "login page",
            message: err.message
        })
    }
    res.status(err.statusCode).send({
        page: "error",
        message: err.message
    })
}

const customErrorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        if (req.url.startsWith('/api')) {
            return handleAPIError(err, res, next)
        }
        return handleWebsiteError(err, res, next)
    }
    next()
}

const genericErrorHandler = (err, req, res, next) => {
    const genericError = new CustomError("Something went very wrong...", 500)
    if (req.url.startsWith('/api')) {
        return handleAPIError(genericError, res)
    }
    return handleWebsiteError(genericError, res)
}

module.exports = {
    customErrorHandler,
    genericErrorHandler
}
