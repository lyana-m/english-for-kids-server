import * as express from 'express';
const { MongoClient } = require('mongodb');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const getCategories = async (req: express.Request, res: express.Response) => {
  const client = MongoClient(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const categories = await client.db().collection('categories').find().sort({ name: 1 }).toArray();
    const words = await client.db().collection('words').find().toArray();
    const categoryWithCount = categories.map((category: any) => {
      return { ...category, count: words.filter((word: any) => word.categoryId === `${category._id}`).length };
    });
    res.send(categoryWithCount);
  } catch (e) {
    throw Error(e);
  } finally {
    await client.close();
  }
};

export const getWords = async (req: express.Request, res: express.Response) => {
  const client = MongoClient(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const words = await client.db().collection('words').find(req.query).toArray();
    res.send(words);
  } catch (e) {
    throw Error(e);
  } finally {
    await client.close();
  }
};

export const createWord = async (req: any, res: any, next: any) => {
  const client = MongoClient(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
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

    const newWord = {
      word: word,
      translation: translation,
      image: savedImage.url,
      audioSrc: savedAudio.url,
      categoryId: categoryId,
    };

    await client.db().collection('words').insert(newWord);
  } catch (e) {
    throw Error(e);
  } finally {
    await client.close();
  }
};