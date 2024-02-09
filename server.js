const dotenv = require('dotenv')
const mongoose = require('mongoose')

const app = require('./app')

dotenv.config({ path: './config.env' })

const database = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)

mongoose.connect(database, {
    useNewUrlParser: true
}).then(() => {
    console.log("DB connection successful")
})

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message, err.stack);
    process.exit(1);
});

const port = process.env.PORT || 3000
const server = app.listen(port, (req, res) => {
    console.log('server up')
})

