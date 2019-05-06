const jwt = require('jsonwebtoken')

const User = require('../models/user')
 if (process.env.NODE_ENV === "production") {
  // var connectionURL = process.env.CONNECTION_URL;
  var secret = process.env.SECRET;
} else {
   const config = require("../config.js");
  var connectionURL = config; 
  var secret = config.secret;
} 
const auth = function( req, res, next ) {
  try {
    const {secret} = require("../config.js");
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, secret)
    User.findOne({ _id: decoded._id, 'tokens.token': token }).then(function(user) {
      if(!user) {
        throw new Error()
      }
      req.token = token
      req.user = user
      next()
    }).catch(function(error) {
      res.status(401).send({ error: 'Authenticate plz'})
    })
  } catch(e) {
    res.status(401).send({ error: 'Authenticate plz'})
  }
}

module.exports = auth