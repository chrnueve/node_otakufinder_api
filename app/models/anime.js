// Load required packages
var mongoose = require('mongoose');

var AnimeSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String
});

module.exports = mongoose.model('Anime', AnimeSchema);

// var populateDB = function() {
//   var request = require('request');
//   var cheerio = require('cheerio');
//   var animes = [];
//
//   url = 'http://myanimelist.net/watch/promotion/popular';
//
//   request(url, function(error, response, html){
//
//       // First we'll check to make sure no errors occurred when making the request
//       if(!error){
//           // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
//           trailers = []
//           titles   = []
//           var $ = cheerio.load(html);
//           $('.po-r').each(function(i, elem) {
//             trailers[i] = $(this).prop('href');
//           });
//           $('.video-info-title').each(function(i, elem) {
//             titles[i] = $(this).find('.mr4').text();
//           });
//
//           for(var i = 0; i < titles.length ; i++) {
//             animes.push({title: titles[i], address: trailers[i] })
//          }
//       }
//   })
//
//
//
//     db.collection('animes', function(err, collection) {
//         collection.insert(animes, {safe:true}, function(err, result) {});
//     });
//
// };
//
