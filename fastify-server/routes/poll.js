const {showPolls, createPoll, usersPolls, getPoll, vote, deletePoll} = require('../controllers/poll')

function pollRoutes (fastify, options, done) {
    
    // show all polls
    fastify.get('/api/polls',showPolls)

    // create polls
    fastify.post('/api/polls',{
        type: 'object',
        preHandler: [fastify.authenticate],
        handler: createPoll
    })

    // polls by a user
    fastify.get('/api/polls/user',{
        type: 'object',
        preHandler: [fastify.authenticate],
        handler: usersPolls
    })
    
    // get a specific poll with given id
    fastify.get('/api/polls/:id',{
        type: 'object',
        handler: getPoll
    })


    // vote for a specific poll with given id
    fastify.post('/api/polls/:id',{
        type: 'object',
        preHandler: [fastify.authenticate],
        handler: vote
    })

    // delete a poll with given id
    fastify.delete('/api/polls/:id',{
        type: 'object',
        preHandler: [fastify.authenticate],
        handler: deletePoll
    })

    done()
}

module.exports = pollRoutes