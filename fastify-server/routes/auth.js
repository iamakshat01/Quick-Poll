const {getUsers, register, login} = require('../controllers/auth');


function authRoutes (fastify,options,done) {

    fastify.get('/api/auth', {
        handler: getUsers
    });

    fastify.post('/api/auth/register',{
        type: 'object',
        handler: register
    })

    fastify.post('/api/auth/login',{
        type: 'object',
        handler: login
    })

    done()
}

module.exports=authRoutes


