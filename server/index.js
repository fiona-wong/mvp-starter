var express = require('express');
var bodyParser = require('body-parser');
var request =require('request');
var getData = require('./datafetcher.js')
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var items = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.use(bodyParser.urlencoded());

app.get('/events', (req, res) => {
	//console.log(req.body);
	items.save({location: req.body.query}, results => {
		res.send(JSON.stringify(results));
	});
});

app.post('/events', (req, res) => {
  getData.getEventData(req.body.query, results => {
  	results.events.forEach(result => {
	    var eventData = {
	    	location: req.body.query,
			  url: result.vanity_url,
			  name: result.name.text,
			  date: result.start.utc,
			  subcategory: result.subcategory_id
	    }
	    items.save(eventData, () => {
	    	items.save({location: req.body.query}, (results) => {
	    		res.send(JSON.stringify(results));
	    	})
	    })
    })
  })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

