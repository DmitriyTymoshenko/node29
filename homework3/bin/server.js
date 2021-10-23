const app = require('../app')
require('dotenv').config()
const mongoose = require('mongoose')
const {PORT = 3000, DB_HOST} = process.env

const createServer = async () => {
    try {
        await mongoose.connect(DB_HOST , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT)
        console.log('Database connection successful');
    } catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}



createServer()






