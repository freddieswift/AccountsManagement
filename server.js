const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config({ path: './config.env' })

const app = require('./app')

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message, err.stack);
    process.exit(1);
});

const port = process.env.PORT || 3000
const server = app.listen(port, (req, res) => {
    console.log('server up')
})

