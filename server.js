const express = require('express');
const bodyParser = require('body-parser');


// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');


var usersRouter = require('./app/routes/users');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

//Routes
app.use('/users', usersRouter);


var cookieParser = require('cookie-parser');
var path = require('path')
var createError = require('http-errors');
var logger = require('morgan');


// Require Notes routes
require('./app/routes/lab.routes.js')(app);

// view engine setup
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

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
    // res.json({"message": "Welcome to EasyLab application. Take Labs quickly. Organize and keep track of all your Labs."});
    res.render('index', { error: false });
});



// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

