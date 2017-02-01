// Load required packages
var mongoose = require('mongoose');

var FavoriteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  animeId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Sets the createdAt parameter equal to the current time
FavoriteSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
