const mongoose = require('mongoose');

const SportsSchema = new mongoose.Schema({

  topic: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
 category : {
  type: String,
  required: true

  }
});

const Sports = mongoose.model('Sports', SportsSchema);

module.exports = Sports;
