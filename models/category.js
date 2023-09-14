const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true, maxLength: 50 },
  description: { type: String, maxLength: 200 },
});

CategorySchema.virtual('url').get(function() {
  return `/store/category/${this.id}`;
})

module.exports = mongoose.model('Category', CategorySchema);