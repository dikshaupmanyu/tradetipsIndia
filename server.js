// server.js

// set up ======================================================================
// get all the tools we need
var compression = require('compression')
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var http = require('http');
var https = require('https');
var fs = require('fs');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
var path = require('path');
app.configure(function() {

	// set up our express application
	app.use(compression());
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms

	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
	app.use(express.static(path.join(__dirname, 'public')));
	app.use((req, res, next) => {
	  res.header('Access-Control-Allow-Origin', '*');
	  next();
	});

});

// routes ======================================================================
require('./app/routes.js')(app); // load our routes and pass in our app and fully configured passport
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(port);
// launch ======================================================================
// app.listen(port);
console.log('The magic happens on port ' + port);