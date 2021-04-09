const jwt = require('jsonwebtoken');
const config=require('../config')


module.exports = (req, res, next) => {
  if (req.headers['authorization']) {
    const token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, config.SECRET, (err, decoded) => {
      if (err) {
        next(Error('Please Sign In'));
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    next(Error('Please SignIn or Register'));
  }
};
