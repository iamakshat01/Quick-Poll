const mongoose = require('mongoose');
const config=require('../config')
mongoose.Promise = global.Promise;
//console.log(config)


mongoose.connect(config.database);

module.exports.User = require('./user');
module.exports.Poll = require('./poll');
