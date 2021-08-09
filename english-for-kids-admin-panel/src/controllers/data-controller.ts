import * as express from 'express';
import { IWord } from '../services/data-service';
const cloudinary = require('cloudinary').v2;
const dataService = require('../services/data-service');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

interface ICategory {
  _id?: string;
  name: string;
}

export const getCategories = async (req: express.Request, res: express.Response) => {

  try {
    const categories = await dataService.getAllCategories();
    const words = await dataService.getAllWords();
    const categoryWithCount = categories.map((category: any) => {
      const filteredWords = words.filter((word: any) => word.categoryId === `${category._id}`);
      return { ...category.toJSON(), count: filteredWords.length, image: filteredWords[0] ? filteredWords[0].image : null };
    });
    res.send(categoryWithCount);
  } catch (e) {
    throw Error(e);
  }
};

export const createCategory = async (req: any, res: any, next: any) => {
  try {
    const newCategory = { name: req.body.name };
    await dataService.addCategory(newCategory);
    res.sendStatus(200);
  } catch (error) {
    throw Error(error);
  }
}

export const updateCategory = async (req: any, res: any, next: any) => {
  try {
    const upadatedCategory = { name: req.body.name };
    await dataService.updateCategory(req.body.categoryId, upadatedCategory);
    res.sendStatus(200);
  } catch (error) {
    throw Error(error);
  }
}

export const deleteCategory = async (req: any, res: any, next: any) => {
  try {
    await dataService.deleteCategory(req.query.id);
    await dataService.deleteWords(req.query.id);
    res.sendStatus(200);
  } catch (error) {
    throw Error(error);
  }
}

export const getWords = async (req: express.Request, res: express.Response) => {
  try {
    const categoryId = req.query.categoryId;
    if (!categoryId) {
      res.status(404).json({ error: 'categoryId not found' });
      return;
    }
    if (typeof categoryId !== "string") {
      res.status(500).json({ error: 'Invalid categoryId' });
      return;
    }
    const words = await dataService.getWords(categoryId);
    res.send(words);
  } catch (e) {
    throw Error(e);
  }
};

export const getAllWords = async (req: any, res: any, next: any) => {
  try {
    const words = await dataService.getAllWords();
    const categories = await dataService.getAllCategories();
    const wordForStatistics = words.map((word: IWord) => {
      const name = categories.find((category: ICategory) => `${category._id}` === word.categoryId).name;
      console.log(name);
      return {
        word: word.word,
        translation: word.translation,
        categoryName: name,
        image: word.image,
        audio: word.audioSrc
      }
    });
    res.send(wordForStatistics);
  } catch (error) {
    throw Error(error);
  }
}

export const createWord = async (req: any, res: any, next: any) => {
  try {
    const audio = req.files.audio[0];
    const image = req.files.image[0];
    const word = req.body.word;
    const translation = req.body.translation;
    const categoryId = req.body.categoryId;

    const savedAudio = await cloudinary.uploader.upload(
      audio.destination + audio.filename,
      { folder: 'audio', resource_type: 'auto' },
      function (error: Error, result: any) {
        console.log(result, error);
      },
    );
    const savedImage = await cloudinary.uploader.upload(
      image.destination + image.filename,
      { folder: 'image', resource_type: 'auto' },
      function (error: Error, result: any) {
        console.log(result, error);
      },
    );

    const newWord: IWord = {
      word: word,
      translation: translation,
      image: savedImage.url,
      audioSrc: savedAudio.url,
      categoryId: categoryId,
    };

    await dataService.addWord(newWord);
    res.sendStatus(200);
  } catch (e) {
    throw Error(e);
  }
}

export const updateWord = async (req: any, res: any, next: any) => {
  try {
    const audio = req.files.audio[0];
    const image = req.files.image[0];
    const word = req.body.word;
    const translation = req.body.translation;

    const savedAudio = await cloudinary.uploader.upload(
      audio.destination + audio.filename,
      { folder: 'audio', resource_type: 'auto' },
      function (error: Error, result: any) {
        console.log(result, error);
      },
    );
    const savedImage = await cloudinary.uploader.upload(
      image.destination + image.filename,
      { folder: 'image', resource_type: 'auto' },
      function (error: Error, result: any) {
        console.log(result, error);
      },
    );

    const upadatedWord: IWord = {
      word: word,
      translation: translation,
      image: savedImage.url,
      audioSrc: savedAudio.url,
    };

    await dataService.updateWord(req.body.id, upadatedWord);
    res.sendStatus(200);
  } catch (error) {
    throw Error(error);
  }
}

export const deleteWord = async (req: any, res: any, next: any) => {
  try {
    await dataService.deleteWord(req.query.id);
    res.sendStatus(200);
  } catch (error) {
    throw Error(error);
  }
}
