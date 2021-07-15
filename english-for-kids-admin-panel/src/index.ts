const express = require('express');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const authRouter = require('./routes/authRouter');
const cors = require('cors');
var bodyParser = require('body-parser');

const client = MongoClient(process.env.DB);

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use('', authRouter);

const start = async () => {
  try {  
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

start();