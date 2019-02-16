// server.js
const express        = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser     = require('body-parser');
const config             = require('./config');
const app            = express();

const PORT = config.port || 3000;
const env = process.env.NODE_ENV || 'development';
process.env.TZ = config.defaultTimeZone;
process.env.NODE_ENV = env;
app.use(cors());
app.use(bodyParser.json());

function connect() {
	if(config.monogoDb.username.length>0){
		mongoose.connect(`mongodb://config.monogoDb.username:config.monogoDb.password@${config.monogoDb.host}:${config.monogoDb.port}/${config.monogoDb.database}`,{ useNewUrlParser: true });	
	}else{
		mongoose.connect(`mongodb://${config.monogoDb.host}:${config.monogoDb.port}/${config.monogoDb.database}`,{ useNewUrlParser: true });	
	}
    
    mongoose.set('useFindAndModify', true);
    return mongoose.connection;
}
let server;
function startServer() {
    require('./app/routes')(app);
    server = app.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
    });
}

connect()
    .on('connected', startServer)
    .on('error', console.log);
