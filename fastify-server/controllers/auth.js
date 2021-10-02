const db = require('../models');

// for development only getUsers
exports.getUsers = async function(request, reply) {
  try {

    const users = await db.User.find();
    return reply.code(200).send(users);

  } catch (err) {

    return reply.code(400).send(err);

  }
};

// register a user
exports.register = async function(request, reply)  {
  try {

    const user = await db.User.create(request.body);
    const { id, username } = user;
    const token = this.jwt.sign({ id, username })

    return reply.code(201).send({
      id,
      username,
      token,
    });

  } catch (err) {

    if (err.code === 11000) {
      err.message = 'Sorry, that username is already taken';
    }
    
    return reply.code(400).send(err);
  }
};

// login a user
exports.login = async function (request, reply)  {
  try {

    const user = await db.User.findOne({
      username: request.body.username,
    });

    const { id, username } = user;
    const valid = await user.comparePassword(request.body.password);

    if (valid) {
      const token = this.jwt.sign({ id, username });
      return reply.code(200).send({
        id,
        username,
        token,
      });
    } else {
      throw new Error();
    }
    
  } catch (err) {

    err.message='Invalid Username/Password'
    return reply.code(400).send(err);
  }
};
