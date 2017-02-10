var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var db = require('node-localdb');
var app = express();
var articles = db('articles.json');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/../views'));

app.use(bodyParser());
app.use(express.static(path.join(__dirname,'/../bower_components')));

app.get('/', (req, res) => {
	res.render('index', {
		title: 'Articles',
		items: build_array(articles)
	});
	console.log(articles);
});

function sendErrNotification(err) { console.log('catch: ', err); };
function build_array(db) {
	const art_ary = new Array();
//	Promise.all([
//		db.findOne({id:'1'}),
//		db.findOne({id:'2'}),
//		db.findOne({id:'3'})
//		]).then(entries) => {
//			art_ary = entries;
//		}.catch((err) => { sendErrNotification(error); });
	articles.count({}).then((count) => {
		counter = JSON.parse(count);
		for (i=1; i<=counter; i++) {
			db.findOne({id:i}).then(function(row){
				art_ary[i]=JSON.parse(row_arr['1']);
			});
		}
  	}).catch((err) => { sendErrNotification(err); });
  	console.log(art_ary);
	return art_ary;
};

app.post('/add', (req, res) => {
  	let newItem = req.body.newItem;

  // note: no checking that `newItem` is actually set and valid. Oops.
  	articles.count({}).then((count) => {
    	console.log(count);
    	articles.insert({
      		id: JSON.parse(count + 1),
      		desc: newItem
    	})
  	}).catch((err) => { sendErrNotification(err); });

	res.redirect('/');
});

app.listen(1337, function() {
	console.log('ready on port 1337');
});