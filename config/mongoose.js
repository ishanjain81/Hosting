const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://trialmongo:MhiLvK0ZaANmBm66w1CwEsSe3z18iRlt8dazGJ29jeSQ2vCvOAzFAZa3MHVWdeDX8v6k2swIMV5nOpv1uhRS7A==@trialmongo.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@trialmongo@`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to database'));

db.once('open',function(){
    console.log('Successfully connected to the database');
});

module.exports = db;

// Data Base set up File