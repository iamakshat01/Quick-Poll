# API - QuickPoll

Built using Fastify on Node.js and MongoDB as database.

# Details

- `/api docs` </br> for swagger

- `/api/auth/register` for signup</br>

- `/api/auth/login` for signin </br>

- `/api/polls/user`  to get all polls from a user </br>

- `/api/polls/:pollId` to get/vote/delete poll</br>

- `/api/polls/` to create/show poll</br>

![Swagger](https://i.ibb.co/ngp1Ry5/Screenshot-from-2021-10-04-19-00-45.png)

# Local Setup
1. Run `npm install`.
2. Create .env file with following details JWT secret, Database Link and Port
	- SECRET=' '
	- DATABASE = ' '
	- PORT = ' '
Run `npm start` in the Backend repo first and then in Frontend .
3. For API details checkout backend repository Readme.