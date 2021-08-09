import { model, Schema } from 'mongoose';

const WordSchema = new Schema({
  word: { type: String, required: true },
  translation: { type: String, required: true },
  image: { type: String, required: true },
  audioSrc: { type: String, required: true },
  categoryId: { type: String, required: true }
});

module.exports = model('words', WordSchema);
