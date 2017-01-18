// Load required packages
var Anime = require('../app/models/anime');

// Create endpoint /api/animes for POSTS
exports.postAnimes = function(req, res) {
  // Create a new instance of the Anime model
  var anime = new Anime();

  // Set the anime properties that came from the POST data
  anime.title = req.body.title;
  anime.description = req.body.description;
  anime.url = req.body.url;

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
