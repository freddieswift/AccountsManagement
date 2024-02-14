const mongoose = require('mongoose')
const dotenv = require('dotenv')

let databaseURL = process.env.DATABASE_URL.replace('<password>', process.env.DATABASE_PASSWORD)

if (process.env.NODE_ENV === 'development') {
    databaseURL = databaseURL.replace('<database_name>', process.env.DATABASE_TEST)
}
else if (process.env.NODE_ENV === 'production') {
    databaseURL = databaseURL.replace('<database_name>', process.env.DATABASE_PROD)
}

module.exports = mongoose.connect(databaseURL, {
    useNewUrlParser: true
}).then((connection) => {
    console.log("DB connection successful")
    return connection.connection.getClient()
})

