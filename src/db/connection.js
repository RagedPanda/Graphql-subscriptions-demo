const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODBURI)

const connection = mongoose.connection

connection.on('close', () => {
  console.log('MongoDB connection closed')
  process.exit(0)
})

module.exports = mongoose
