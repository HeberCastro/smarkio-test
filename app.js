const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage, getComentaries, getComentariesById, addComentary, getSound} = require('./routes/index');
const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'comentary'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao Banco!');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder

// routes for the app
app.get('/', getHomePage);
app.get('/comentaries', getComentaries);
app.get('/comentaries/:id', getComentariesById);
app.post('/', addComentary);
app.get('/sound/:id', getSound);


// set the app to listen on the port
app.listen(port, () => {
    console.log('Servidor disponível na porta:' + port);
});
