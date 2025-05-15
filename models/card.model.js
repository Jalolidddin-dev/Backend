const { Schema, model } = require('mongoose');

const cardSchema = new Schema({
  describtion: { type: String, required: true },
  picture: { type: String },
  author: { type: Schema.ObjectId, ref: 'User' },
  category: { type: String, required: true },
  title: { type: String, required: true },
});



module.exports = model('Card', cardSchema);