// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var authController = require('./controllers/auth');
var animeController = require('./controllers/anime');
var userController = require('./controllers/user');
var favoriteController = require('./controllers/favorite');

// connect to the anime mongoDB
db = process.env.MONGOLAB_URI || "mongodb://localhost:27017/ANIME_DB"

mongoose.connect(db);
// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use the passport package in our application
app.use(passport.initialize());

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /animes
router.route('/animes')
  .post(authController.isAuthenticated, animeController.postAnimes)
  .get(animeController.getAnimes);
// remove authController.isAuthenticated for testing
router.route('/animes/scrape')
  .get(animeController.scrape);

// Create endpoint handlers for /animes/:anime_id
router.route('/animes/:anime_id')
  .get(authController.isAuthenticated, animeController.getAnime)
  .put(authController.isAuthenticated, animeController.putAnime)
  .delete(authController.isAuthenticated, animeController.deleteAnime);

// Create endpoint handler for /favorite
router.route('/favorites')
  .get(authController.isAuthenticated, favoriteController.getFavorites)
  .post(authController.isAuthenticated, favoriteController.postFavorites);

// Create endpoint handler for /favorites/:favorite_id
router.route('/favorites/:favorite_id')
  .delete(authController.isAuthenticated, favoriteController.deleteFavorite);


// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(userController.getUsers);
// Register all our routes with /api

app.use('/api', router);

// Start the server
app.listen(port);
console.log('Insert anime on port ' + port);

module.exports = app
