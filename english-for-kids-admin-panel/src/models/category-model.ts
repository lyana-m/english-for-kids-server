import { model, Schema } from 'mongoose';

const CategorySchema = new Schema({
  name: { type: String, required: true },
});

module.exports = model('categories', CategorySchema);
