var Note = require('../models/Note.js');
var Article = require('../models/Article.js');
var cheerio = require('cheerio');
var request = require('request');

module.exports = function (app) {
	console.log('routes module loaded.');

	app.get('/scrape', function (req, res) {
		// first, we grab the body of the html with request
		request('http://www.theonion.com/', function (err, response, html) {
			if (err) {
				console.log(err);
			} else {
				// then, we load that into cheerio and save it to $ for a shorthand selector
				var $ = cheerio.load(html);
				// now, we grab every h2 within an article tag, and do the following:
				$('.summary .info header .headline').each(function (i, element) {
					// save an empty result object
					var result = {};

					// add the text and href of every link,
					// and save them as properties of the result obj
					result.title = $(this).children('header .headline a').text();
					result.link = $(this).children('header .headline a').attr('href');

					// using our Article model, create a new entry.
					// Notice the (result):
					// This effectively passes the result object to the entry (and the title and link)
					var entry = new Article(result);

					// now, save that entry to the db
					entry.save(function (err, doc) {
						// log any errors
						if (err) {
							console.log(err);
						} else {
							console.log(doc);
						}
					});
				});
			}
		});
		// tell the browser that we finished scraping the text.
		res.send('Scrape Complete');
	});

	app.get('/articles', function (req, res) {
		Article.find(function (err, docs) {
			if (err) {
				console.log(err);
			} else {
				res.json(docs);
			}
		});
	});

	app.get('articles/:id', function (req, res) {
		var myId = req.params.id;
		Article.findOne({ '_id': myId })
			.populate('note')
			.exec(function (err, docs) {
				if (err) {
					console.log(err);
				} else {
					res.json(docs);
				}
			});
	});

	app.post('/articles/:id', function (req, res) {
		var newNote = new Note(req.body);
		newNote.save(function (err, docs) {
			if (err) {
				console.log(err);
			} else {
				Article.findOneAndUpdate({ '_id': req.params.id }, { 'note': docs._id })
					.exec(function (err, docs) {
						if (err) {
							console.log(err);
						} else {
							res.send(docs);
						}
					});
			}
		});
	});

	app.get('/', function (req, res) {
		console.log('serving index.hbs');
		var hbsObj = {};
		res.render('index', hbsObj);
	});
};
