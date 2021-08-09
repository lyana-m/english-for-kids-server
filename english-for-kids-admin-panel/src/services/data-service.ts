const CategoryModel = require('../models/category-model');
const WordModel = require('../models/word-model');

export interface IWord {
  id?: string;
  word: string;
  translation: string;
  image: string;
  audioSrc: string;
  categoryId?: string;
}

export interface ICategory {
  name: string;
}

class DataService {

  async getAllCategories() {
    return CategoryModel.find().sort({ name: 1 });
  }

  async addCategory(newCategory: ICategory) {
    const categoryForSave = new CategoryModel(newCategory);
    return categoryForSave.save();
  }

  async updateCategory(categoryId: string, updatedCategory: ICategory) {
    return CategoryModel.update({ _id: categoryId }, updatedCategory);
  }

  async deleteCategory(categoryId: string) {
    return CategoryModel.deleteOne({ _id: categoryId });
  }

  async deleteWords(categoryId: string) {
    return WordModel.deleteMany({ categoryId: categoryId })
  }

  async getAllWords() {
    return WordModel.find().sort({ name: 1 });
  }

  async getWords(categoryId: string) {
    return WordModel.find({ categoryId });
  }

  async addWord(newWord: IWord) {
    const wordForSave = new WordModel(newWord);
    return wordForSave.save();
  }

  async updateWord(id: string, updatedWord: IWord) {
    return WordModel.update({ _id: id }, updatedWord);
  }

  async deleteWord(id: string) {
    return WordModel.deleteOne({ _id: id });
  }
}

module.exports = new DataService();
