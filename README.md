# Video Conferencing and Chatting

## Description
Building Microsoft Teams Clone for smooth Video Conferencing and Chatting with friends with Authentication of users and automatic invite email feature.

## See Live Demo

### visit --> http://54.227.78.176:8000

Note - To get access to Video camera and Microphone with http protocol we have to whitelist the website URL in the browser, for that
- go to chrome://flags
- Insecure origins treated as secure
- Add website URL here and Enabled it
- Restart browser

## Screenshots

![Home Page](uploads/homePage-ss.png "Home Page")
![Call Page](uploads/Call-ss.png "call Page")
![Sign Up Page](uploads/Sign-up-ss.png "Sign Up Page")
![Mailer Page](uploads/mailer-ss.png "Mailer Page")

## Technologies Stack:

### Components
- Node.js,MongoDB,Express.js,EJS
- Socket.io,Peer.js
- Javascript,AJAX,jquery
- Sass,css
- Nodemailer
- Notyjs
- uuidv4

### Insights
- used socket.io and Peerjs for implementing Video call and Chat.
- Camera and Microphone turn on/off feature.
- button for hiding and enlarging the chat box
- uuidv4 for generating random urls.
- passport-jwt strategy for authentication and authorization.
- passport-google-oauth2 strategy for social authentication through google.
- used Nodemailer to send out emails.
- used morgan to make production logs
- Notyjs for display notifications

### How to install
- Clone the project onto your local machine.
- Then cd videochat
- npm install to install dependencies
- globally install nodemon
- globally install and set mongodb
- nodemon index.js (run server in development mode)
- npm run prod_start (to run server in production mode)
- Visit your app at http://localhost:8000

### Settings for Mailer and Google Sign In
- go to environment file in config
- add your Gmail id and password to use it to send invite mails
- add Google Oauth 2 credentials for google sign in/up
- for production mode add these in environment variables.