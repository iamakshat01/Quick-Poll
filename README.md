# [Quick Poll 🔗](https://quickpoll.netlify.app/)

![Landing Page](https://i.ibb.co/mTFM0Lr/Screenshot-from-2021-10-04-18-43-34.png")
![Poll](https://i.ibb.co/56YSfJL/Screenshot-from-2021-10-04-18-45-43.png)

<br/>

# Project Description

Quick-Poll is a WEB-APP to support quick, easy and authenticated polling.


# Features Implemented


   - Landing Page with Navigation, User and Other Polls 
   - Login/Signup Page
   - Create Poll 
   - Single Poll with vote and view responses
 
 
# Technologies and Packages Used

## 1. Frontend

1. React
2. Reactstrap
3. VictoryJS

## 2. Backend

1. Node.js
2. Fastify (Earlier used Express)
3. MongoDB
4. Mongoose
5. Fastify-JWT
6. Bcryptjs
7. Some Fastify-Plugins

<br/>

# Local Setup

Clone the frontend and backend repositories, cd into them individually, and then follow the below mentioned steps for setting up backend and frontend seprately.

## 1. Frontend

1. Run `yarn install`.
2. Change backend port in config.js file if you change it in backend, by default the backend is setup to run on port 3000.

## 2. Backend

1. Run `npm install`.
2. Create .env file with following details JWT secret, Database Link and Port
	- SECRET=' '
	- DATABASE = ' '
	- PORT = ' '
Run `npm start` in the Backend repo first and then in Frontend .
3. For API details checkout backend repository Readme.
