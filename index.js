const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');
const db = require('./config/mongoose');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const path = require('path');
const favicon = require('serve-favicon');

// Setting Favicon
app.use(favicon(path.join(__dirname,'/assets/images/favi.ico'))); 

//Setting Up Session Cookie
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// Setting Up Goggle LogIn
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo')(session);

// set up server with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('Chat server is listening on port 5000');

// set up peer server
const pServer = require('http').Server(app);
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(pServer, {
    debug: true,
});
pServer.listen(5001);
app.use('/peerjs', peerServer);
console.log('Peer server is listening on port 5001');

//setting up sass middleware
if(env.name == 'development' && false){ // whenever we have to change sass files
    app.use(sassMiddleware({            // remove && false from here
        src : './assets/scss',
        dest : './assets/css',
        debug : true,
        outputStyle : 'extended',
        prefix : '/css'
    }));
}

//setting static files
app.use(express.static('./assets'));

// To use AJAX
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//Setting Up Cookies
app.use(cookieParser());

// Setting Up Morgan
app.use(logger(env.morgan.mode,env.morgan.options));

//using layouts
app.use(expressLayouts);
//for styles and scripts in layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use ejs & set up view engine
app.set('view engine','ejs');
app.set('views','./views');


//Setting Up Session
app.use(session({
    name: 'Teams',
    // Secret Key
    secret: 'Hello!Teams',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    }, // Setting Up Mongo Store to store Session Cookies
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'Connect Mongo-DB Setup Ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// Setting Up Flash Messages
app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));

//set express 
app.listen(port,function(err){
    if(err){
        console.log('Error in starting Server :',err);
    }
    console.log(`Server is Running on port : ${port}`);
});