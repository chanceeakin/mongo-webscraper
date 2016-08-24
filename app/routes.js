module.exports = function(app) {
	console.log('routes module loaded.');

    app.get('/', function(req, res) {
    	console.log('serving index.hbs');
    	var hbsObj = {};
        res.render('index', hbsObj);
    })

};