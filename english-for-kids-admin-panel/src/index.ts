const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use('', authRouter);

const start = async () => {
  try {
    // await mongoose.connect(`mongodb+srv://lyana:lyana@cluster0.oqx0p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
    await mongoose.connect(`mongodb+srv://lyana:lyana@cluster0.oqx0p.mongodb.net/english-for-kids?retryWrites=true&w=majority`);
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

start();