const CustomError = require('./customError')

const handleAPIError = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
}

const handleWebsiteError = (err, res) => {
    if (err.statusCode === 401) return res.redirect('/login')

    if (err.message === 'You must create a company before accessing this feature') {
        return res.redirect('/createCompany')
    }

    return res.render('errorpage', {
        title: 'Error',
        message: err.message,
        code: err.statusCode
    })
}

const handleDuplicateError = (err) => {
    const field = Object.keys(err.keyValue)[0]
    return new CustomError(`This ${field} is already in use. Please try another one`, 400)
}

module.exports = errorHandler = (err, req, res, next) => {
    let error
    if (err instanceof CustomError) {
        error = err
    }
    else {
        if (err.name === 'ValidationError') {
            error = new CustomError('Please provide the missing values <INSERT HERE>', 400)
        }
        else if (err.name === 'CastError') {
            error = new CustomError('Cannot find <SOMETHING> with that <SOMETHING>', 404)
        }
        else if (err.code === 11000) {
            error = handleDuplicateError(err)
            //error = new CustomError('There is is already a <SOMETHING> with this <SOMETHING>, please try another one', 400)
        }
        else {
            console.log(err)
            error = new CustomError('Something went very wrong...', 500)
        }
    }

    if (req.url.startsWith('/api')) {
        return handleAPIError(error, res)
    }
    handleWebsiteError(error, res)
}

