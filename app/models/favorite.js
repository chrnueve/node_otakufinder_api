// Load required packages
var mongoose = require('mongoose');

var FavoriteSchema = new mongoose.Schema({
  userId: String,
  animeId: String
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
