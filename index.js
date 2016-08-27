var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var routes = require('./app/routes.js');

var app = express();

routes(app);
app.use('/static', express.static(path.join(__dirname, '/public')));
app.use('/static-two', express.static(path.join(__dirname, '/bower_components')));
app.use(bodyParser.urlencoded({
	extended: false
}));

mongoose.connect('mongodb://localhost/webscraper');
var db = mongoose.connection;

db.on('error', function (err) {
	console.log('Mongoose error: ' + err);
});

db.once('open', function () {
	console.log('Mongoose connected!');
});

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.listen(3000, function (req, res) {
	console.log('app is running.');
});
