const express = require('express');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const authRouter = require('./router/index');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const client = MongoClient(process.env.DB);

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use('', authRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

start();
