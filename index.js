var express = require('express'),
	exphbs = require('express-handlebars'),
	cheerio = require('cheerio'),
	mongoose = require('mongoose'),
	request = require('request'),
	bodyParser = require('body-parser'),
	routes = require('./app/routes.js');

var app = express();

routes(app);
app.use('/static', express.static(__dirname + '/public'));
app.use('/static-two', express.static(__dirname + '/bower_components'));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.listen(3000, function(req, res){
	console.log('app is running.');
});