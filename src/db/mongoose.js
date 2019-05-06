const mongoose = require('mongoose')
const config = require("../config.js");
 var connectionURL = 'mongodb+srv://rolando:mujfad-wAkhes-sirca6@cluster0-v6itx.mongodb.net/test?'

if (process.env.NODE_ENV === "production") {
  var connectionURL = process.env.CONNECTION_URL;
} else {
  
  var connectionURL = config.connectionURL;
} 

mongoose.connect( connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true
})
