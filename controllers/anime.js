// Load required packages
var Anime = require('../app/models/anime');
var request = require('request');
var cheerio = require('cheerio');

// Create endpoint /api/animes for POSTS
exports.postAnimes = function(req, res) {
  // Create a new instance of the Anime model
  var anime = new Anime();

  // Set the anime properties that came from the POST data
  anime.title = req.body.title;
  anime.description = req.body.description;
  anime.url = req.body.url;
  anime.picture = req.body.picture;

  // Save the anime and check for errors
  anime.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Anime added.', data: anime });
  });
};

// Create endpoint /api/animes for GET
exports.getAnimes = function(req, res) {
  // Use the Anime model to find all anime
  Anime.find(function(err, animes) {
    if (err)
      res.send(err);

    res.json(animes);
  });
};

// Create endpoint /api/animes/:anime_id for GET
exports.getAnime = function(req, res) {
  // Use the Anime model to find a specific anime
  Anime.findById(req.params.anime_id, function(err, anime) {
    if (err)
      res.send(err);

    res.json(anime);
  });
};

// Create endpoint /api/animes/:anime_id for PUT
exports.putAnime = function(req, res) {
  // Use the Anime model to find a specific anime
  Anime.findById(req.params.anime_id, function(err, anime) {
    if (err)
      res.send(err);

    // Update the existing anime url
    anime.url = req.body.url;
    anime.picture = req.body.picture;
    // Save the anime and check for errors
    anime.save(function(err) {
      if (err)
        res.send(err);

      res.json(anime);
    });
  });
};

// Create endpoint /api/animes/:anime_id for DELETE
exports.deleteAnime = function(req, res) {
  // Use the Anime model to find a specific anime and remove it
  Anime.findByIdAndRemove(req.params.anime_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Anime removed.' });
  });
};

exports.scrape = function(req, res) {
  url = 'http://myanimelist.net/watch/promotion/popular'
  request(url, function(error, response, html){
    //
    // First we'll check to make sure no errors
    // occurred when making the request
    if(!error){
      // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
      trailers = []
      titles   = []
      pictures = []
      var $ = cheerio.load(html);

      // import Anime titles
      $('.video-info-title').each(function(i, elem) {
        titles[i] = $(this).find('.mr4').text();
      });

      // import Anime video urls and pictures
      $('.po-r').each(function(i, elem) {
        trailers[i] = $(this).prop('href');
        pictures[i] = $(this).data('bg');
      })
      // combine info to create an Anime object
      for(var i = 0; i < titles.length ; i++) {
        var anime = new Anime();
        // Set the anime properties
        anime.title = titles[i];
        anime.url = trailers[i];
        anime.picture = pictures[i];
        anime.save();
     }
    }
    // end of scraping
  });
  // respond with new animes
  Anime.find(function(err, animes) {
    if (err)
      res.send(err);

    res.json(animes);
  });
}
