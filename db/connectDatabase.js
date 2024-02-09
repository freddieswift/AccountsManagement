const mongoose = require('mongoose')
const dotenv = require('dotenv')

const database = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)

module.exports = mongoose.connect(database, {
    useNewUrlParser: true
}).then((connection) => {
    console.log("DB connection successful")
    return connection.connection.getClient()
})

