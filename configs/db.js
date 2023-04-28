const mongoose = require('mongoose');
require('dotenv').config()


const myServer = mongoose.connect(process.env.mongoUrl)

module.exports = {
    myServer
}