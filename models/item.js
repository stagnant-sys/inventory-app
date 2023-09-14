const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  price: { type: Number, min: 0 },
  number_in_stock: { type: Number, min: 0 },
  image: { type: String }
});

ItemSchema.virtual('url').get(function() {
  return `/store/item/${this.id}`;
});

module.exports = mongoose.model('Item', ItemSchema);