const request = require('request');
const token = require('../config.js');
const qs = require('querystring')

let getEventData = (location, callback) => {
  let options = {
    url: `https://www.eventbriteapi.com/v3/events/search/`,
    headers: {
    	'User-Agent': 'request',
    	'Authorization': `Bearer ${token.TOKEN}`
    },
    qs: {
      sort_by: 'best',
      subcategories: '3008,3006,3014,3018',
      q: location
    }
  }
  request(options, (err, response, body) => {
  	//console.log('startofbodyhere', body);
    callback(JSON.parse(body));

  })
}

module.exports.getEventData = getEventData;
