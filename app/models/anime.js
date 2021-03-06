// Load required packages
var mongoose = require('mongoose');

var AnimeSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  picture: String
});

module.exports = mongoose.model('Anime', AnimeSchema);
