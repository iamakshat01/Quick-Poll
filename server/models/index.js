const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE,{ 
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true 
});

module.exports.User = require('./user');
module.exports.Poll = require('./poll');
