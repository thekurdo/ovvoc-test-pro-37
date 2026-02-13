const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  description: String,
  sortOrder: { type: Number, default: 0 },
});
module.exports = mongoose.model('Category', categorySchema);
