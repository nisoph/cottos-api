const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

/**
 * Create express app
 */
const app = express();

/**
 * Setup body parser
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
