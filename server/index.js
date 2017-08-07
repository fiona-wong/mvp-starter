var express = require('express');
var bodyParser = require('body-parser');
var request =require('request');
var getData = require('./datafetcher.js')
var fs = require('file-system');

var items = require('../database-mongo');

var app = express();


app.use(express.static(__dirname + '/../react-client/dist'));


app.use(bodyParser.urlencoded());

app.get('/events', (req, res) => {
	items.selectAll({location: 'San Francisco'}, results => {
		res.send(JSON.stringify(results));
	});
});

app.post('/events', (req, res) => {

  items.selectAll({location: req.body.query}, results => {
  	if (results) {
  		res.send(results)
  	} else {
		  getData.getEventData(req.body.query, (results)=> {
		  	results.events.forEach(result => {
			    var eventData = {
			    	location: req.body.query,
					  url: result.vanity_url,
					  name: result.name.text,
					  date: result.start.utc,
					  subcategory: result.subcategory_id,
					  logo: result.logo.url
			    }
			    items.save(eventData)
			  })
  	  })
  	  // res.send(fs.readFile('../react-client/dist/errorPage.html'))
    }
  })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

