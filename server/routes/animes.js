var mongo = require('mongodb');
var mongoose = require('mongoose');

var monk = require('monk');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('animedb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'animedb' database");
        db.collection('animes', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'animes' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving anime: ' + id);
    db.collection('animes', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('animes', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addAnime = function(req, res) {
    var anime = req.body;
    console.log('Adding anime: ' + JSON.stringify(anime));
    db.collection('animes', function(err, collection) {
        collection.insert(anime, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateAnime = function(req, res) {
    var id = req.params.id;
    var anime = req.body;
    console.log('Updating anime: ' + id);
    console.log(JSON.stringify(anime));
    db.collection('animes', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, anime, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating anime: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(anime);
            }
        });
    });
}

exports.deleteAnime = function(req, res) {
    var id = req.params.id;
    console.log('Deleting anime: ' + id);
    db.collection('animes', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

var populateDB = function() {
  var request = require('request');
  var cheerio = require('cheerio');
  var animes = [];

  url = 'http://myanimelist.net/watch/promotion/popular';

  request(url, function(error, response, html){

      // First we'll check to make sure no errors occurred when making the request
      if(!error){
          // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
          trailers = []
          titles   = []
          var $ = cheerio.load(html);
          $('.po-r').each(function(i, elem) {
            trailers[i] = $(this).prop('href');
          });
          $('.video-info-title').each(function(i, elem) {
            titles[i] = $(this).find('.mr4').text();
          });

          for(var i = 0; i < titles.length ; i++) {
            animes.push({title: titles[i], address: trailers[i] })
         }
      }
  })



    db.collection('animes', function(err, collection) {
        collection.insert(animes, {safe:true}, function(err, result) {});
    });

};
