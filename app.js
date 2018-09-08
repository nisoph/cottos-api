require('dotenv').config();
const express = require('express');
const busboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');

/**
 * Create express app
 */
const app = express();

/**
 * Setup body parser
 */
app.use(busboy());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(busboyBodyParser());

/**
 * Set up logger
 */
app.use(morgan('dev'));

app.use('/', require('./api'));

app.get('/', function (req, res) {
  res.json({ message: 'Express is up!' });
});


/**
 *  Setup the server
 */
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Express server is listening on port ${port}`);
