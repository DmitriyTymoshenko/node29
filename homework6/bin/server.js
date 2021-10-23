(async () => {
  const mongoose = require('mongoose')
  require('dotenv').config()
  const app = require('../app')
  const { PORT = 3000, DB_HOST } = process.env
  try {
    await mongoose.connect(DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    app.listen(PORT)
    console.log('Database connection successful')
  } catch (e) {
    console.log(e.message)
    process.exit(1)
  }
})()
