const fastify = require('fastify')({ logger: true })
const mongoose = require('mongoose')
const fp = require("fastify-plugin")

require('dotenv').config()

// enabling cors
fastify.register(require("fastify-cors"), {
  origin: "*" // allow all origins (BAD)
});


// swagger documentation -> automatically scrapping 
fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'fastify-api' },
  },
})


fastify.register(require('./plugin/auth'))


// auth routes
fastify.register(require('./routes/auth'))

// poll routes
fastify.register(require('./routes/poll'))



//connected fastify to mongoose
try {
  mongoose.connect(process.env.DATABASE,{ 
        useNewUrlParser: true,
        useUnifiedTopology: true,
  });
  fastify.log.info("DB connected")

  } catch (e) {
    fastify.log.error(e);
}


// start the server
const start = async () => {
  try {

    await fastify.listen(process.env.PORT)

  } catch (error) {

    fastify.log.error(error)

    process.exit(1)
  }
}

start()