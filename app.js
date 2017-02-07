var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var db = require('node-localdb');
var app = express();
var articles = db('articles.json');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser());
app.use(express.static(path.join(__dirname,'bower_components')));

app.get('/', function(req, res){
	res.render('index', {
		title: 'Articles',
		items: articles
	});
	console.log(articles);
});

app.post('/add', function(req, res){
	var newItem = req.body.newItem;
	articles.count({}).then(function(count){
    console.log(count);
	});

	articles.insert({
		id: JSON.parse(articles.count({})) + 1,
		desc: newItem
	});
	res.redirect('/');
});

app.listen(1337, function() {
	console.log('ready on port 1337');
});