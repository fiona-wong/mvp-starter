var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var eventsSchema = mongoose.Schema({
  location: String,
  url: {type: String, unique: true, dropDups: true},
  name: String,
  date: Date,
  subcategory: Number
});

var Event = mongoose.model('Event', eventsSchema);

module.exports.selectAll = function(params, callback) {
  Event.find(params, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};



module.exports.save = function(model, callback) {
  var event = new Event(model);
  Event.find(model)
  .limit(10)
  .sort({date: 1})
  .then(results => {
    if (results.length === 0) {
      event.save();
      callback(event);
    } else {
      callback(results)
    }
  })
}

