const db = require('../models');

// allPolls
exports.showPolls = async function (request, reply) {
  try {

    const polls = await db.Poll.find().populate('user', ['username', 'id']);
    return reply.code(200).send(polls);

  } catch (err) {

    return reply.code(400).send(err);

  }
};

// userPolls
exports.usersPolls = async function(request, reply) {
  const { id } = request.user;
  try {

    const user = await db.User.findById(id).populate('polls');

    return reply.code(200).send(user.polls);
  } catch (err) {

    return reply.code(400).send(err);
  }
};

// creating Poll
exports.createPoll = async function (request, reply) {
  const { id } = request.user;
  const { question, options } = request.body;
  try {
    const user = await db.User.findById(id);
    const poll = await db.Poll.create({
      question,
      user,
      options: options.map(option => ({ option, votes: 0 })),
    });
    user.polls.push(poll._id);
    await user.save();

    return reply.code(201).send({ ...poll._doc, user: user._id });

  } catch (err) {

    return reply.code(400).send(err);

  }
};


// vote for a poll
exports.vote = async function (request, reply) {
  const { id: pollId } = request.params;
  const { id: userId } = request.user;
  const { answer } = request.body;
  try {
    if (answer) {
      const poll = await db.Poll.findById(pollId);
      if (!poll) throw new Error('No poll found');

      const vote = poll.options.map(
        option =>
          option.option === answer
            ? {
                option: option.option,
                _id: option._id,
                votes: option.votes + 1,
              }
            : option,
      );
      
      if (poll.voted.filter(user => user.toString() === userId).length <= 0) {
        poll.voted.push(userId);
        poll.options = vote;
        await poll.save();

        return reply.code(202).send(poll);
      } else {
        throw new Error('Already voted');
      }
    } else {
      throw new Error('No Answer Provided');
    }
  } catch (err) {

    return reply.code(400).send(err);

  }
};

// get speicific poll with pollId
exports.getPoll = async function (request, reply) {
  try {
    const { id } = request.params;
    const poll = await db.Poll.findById(id).populate('user', [
      'username',
      'id',
    ]);
    // .populate('voted', ['username', 'id']);
    if (!poll) throw new Error('No poll found');

    return reply.code(200).send(poll);
    
  } catch (err) {
    return reply.code(400).send(err);

  }
};

// delete a specific poll with pollId
exports.deletePoll = async function (request, reply) {
  const { id: pollId } = request.params;
  const { id: userId } = request.user;
  try {
    let user = await db.User.findById(userId)
    if(user.polls) { 
      user.polls = user.polls.filter(userPoll => {
        return userPoll._id.toString() !== pollId.toString()
      })
    }
    
    const poll = await db.Poll.findById(pollId);
    if (!poll) throw new Error('No poll found');
    
    if (poll.user.toString() !== userId) {
      throw new Error('Unauthorized access');
    }
    
    await user.save()
    await poll.remove();
    return reply.code(202).send({ poll, deleted: true });

  } catch (err) {

    return reply.code(400).send(err);
  }
};
