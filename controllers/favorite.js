// Load required packages
var Favorite = require('../app/models/favorite');

// Create endpoint /api/favorites for POSTS
exports.postFavorites = function(req, res) {
  // Create a new instance of the Favorite model
  var favorite = new Favorite();

  // Set the favorite properties that came from the POST data
  favorite.userId = req.user.id;
  favorite.animeId = req.body.anime_id;

  // Save the favorite and check for errors
  favorite.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Favorite added.', data: favorite });
  });
};

// query by user id
// Create endpoint /api/favorites/:user_id for GET
exports.getFavorites = function(req, res) {
  // Use the Favorite model to find a specific favorite
  Favorite.find({userId: req.user._id}, function(err, favorite) {
    if (err)
      res.send(err);

    res.json(favorite);
  });
};


// Create endpoint /api/favorites/:favorite_id for DELETE
exports.deleteFavorite = function(req, res) {
  // Use the Favorite model to find a specific favorite and remove it
  Favorite.findByIdAndRemove(req.params.favorite_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Favorite removed.' });
  });
};
