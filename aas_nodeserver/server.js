const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const appConfig = require('./config.js')

// create express app
const app = express();

// enable CORS *
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = {url: "mongodb://" + ( (process.argv[2] != undefined && process.argv[2] != null && process.argv[2] != "") ? process.argv[2] : appConfig.database.ip) + ":" + appConfig.database.port + "/" + appConfig.database.dbname};
console.log("Database address: " + dbConfig.url);
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Coreaas database application."});
});

require('./routes/coreaas.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Database server is listening on port 3000");
});