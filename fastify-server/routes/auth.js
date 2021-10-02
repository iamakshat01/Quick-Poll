const {getUsers, register, login} = require('../controllers/auth');


function authRoutes (fastify,options,done) {

    // get users in db -> development only
    fastify.get('/api/auth', {
        handler: getUsers
    });

    // register a user  
    fastify.post('/api/auth/register',{
        type: 'object',
        handler: register
    })

    // login a user
    fastify.post('/api/auth/login',{
        type: 'object',
        handler: login
    })

    done()
}

module.exports=authRoutes


