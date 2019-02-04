const mongoose = require("mongoose");

mongoose.Promise = require("bluebird");
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})

const connection = mongoose.connection

connection.on("open", () => {
  console.log("MongoDB connected");
});

module.exports = mongoose;
