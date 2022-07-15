const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

// Setting Production Logs
const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval: '1d',
    path: logDirectory
});

// development environment
const development = {
    name: 'development',
    db: 'teamsClone',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'icoolishan2000@gmail.com',  // Gmail Id
            pass: '987654321@' // Gmail Password
        }
    },  // google oauth 2 credentials
    google_client_id: '330522351441-qfcv1nt45uofda77kdoilm0ilpj54sh3.apps.googleusercontent.com',
    google_client_secret: 'zVeue7D5_squH4q8XlyujPaq',
    google_call_back_url: 'http://localhost:8000/users/auth/google/callback',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}
// production environment
const production = {
    name: 'production',
    db: 'CloneProduction',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.WEB_GMAIL_ID,  // Gmail Id
            pass: process.env.WEB_GMAIL_PASSWORD // Gmail Password
        }
    },
    google_client_id: process.env.WEB_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.WEB_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.WEB_GOOGLE_CALLBACK_URL,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

if(eval(process.env.NODE_ENV == undefined)){
    console.log('Running in Development Mode');
}
else{
    console.log('Running in Production Mode');
}


module.exports = eval(process.env.NODE_ENV) == undefined ? development: eval(process.env.NODE_ENV);