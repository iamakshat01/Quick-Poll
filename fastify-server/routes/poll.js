const {showPolls, createPoll, usersPolls, getPoll, vote, deletePoll} = require('../controllers/poll')

function pollRoutes (fastify, options, done) {
    
    // CALLBACK AFTER GETTING ACCESS TOKEN FROM /LOGIN/GOOGLE
    fastify.get('/api/polls',showPolls)

    fastify.post('/api/polls',{
        type: 'object',
        preHandler: [fastify.authenticate],
        handler: createPoll
    })

    fastify.get('/api/polls/user',{
        type: 'object',
        preHandler: [fastify.authenticate],
        handler: usersPolls
    })
    
    fastify.get('/api/polls/:id',{
        type: 'object',
        handler: getPoll
    })


    fastify.post('/api/polls/:id',{
        type: 'object',
        preHandler: [fastify.authenticate],
        handler: vote
    })

    fastify.delete('/api/polls/:id',{
        type: 'object',
        preHandler: [fastify.authenticate],
        handler: deletePoll
    })

    done()
}

module.exports = pollRoutes