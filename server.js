// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Anime = require('./app/models/anime');
// connect to the anime mongoDB
mongoose.connect(process.env.MONGOLAB_URI);
mongodb://api:test@ds013584.mlab.com:13584/animes
// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'You are running dangerously low on anime!' });
});

// Create a new route with the prefix /animes
var AnimesRoute = router.route('/animes');

// Create endpoint /api/animes for GET
AnimesRoute.get(function(req, res) {
  // Use the Anime model to find all anime
  Anime.find(function(err, animes) {
    if (err)
    res.send(err);

    res.json(animes);
  });
});

// Create endpoint /api/animes for POSTS
AnimesRoute.post(function(req, res) {
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

    res.json({ message: 'anime added to the locker!', data: anime });
  });
});


// Create a new route with the /anime/:anime_id prefix
var AnimesRoute = router.route('/animes/:anime_id');

// Create endpoint /api/animes/:anime_id for PUT
AnimesRoute.put(function(req, res) {
  // Use the Beer model to find a specific beer
  Anime.findById(req.params.anime_id, function(err, anime) {
    if (err)
      res.send(err);

    // Update the existing anime url
    anime.description = req.body.description;
    anime.url = req.body.url;

    // Save the beer and check for errors
    anime.save(function(err) {
      if (err)
        res.send(err);

      res.json(anime);
    });
  });
});

// Create endpoint /api/animes/:anime_id for DELETE
AnimesRoute.delete(function(req, res) {
  // Use the Anime model to find a specific anime and remove it
  Anime.findByIdAndRemove(req.params.anime_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Anime removed' });
  });
});

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Insert anime on port ' + port);
