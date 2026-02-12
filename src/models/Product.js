const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  price: { type: Number, required: true, min: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  tags: [String],
  stock: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
});
productSchema.index({ name: 'text', description: 'text' });
module.exports = mongoose.model('Product', productSchema);
