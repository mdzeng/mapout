
/**
 * Module dependencies.
 */

var express = require('express');
var cors = require('cors');
var routes = require('./routes/index');
var http = require('http');
var path = require('path');
var templating = require('./lib/templating');
var app = express();
var url = require('url');
var geocoder = require('node-geocoder').getGeocoder('google');
var util = require('util');

// all environments
app.engine('.html', templating);
app.set('view engine', '.html');
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', function (req, res) {
    res.render('landing');
});

app.get('/location', function(req, res) {
	res.header('Access-Control-Allow-Origin', "*");
	geocoder.geocode(req.query.location)
	.then(function(geocodeResponse) {
		res.send(200, geocodeResponse);
	})
	.catch(function(err) {
		res.send(500, 'Error retrieving location for address');
	})
});

//When routes are set up, use the routes middleware
//app.use('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
