const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 8080;

// Read -- get
app.get('/api', (req, res) => {
  res.status(200).send('Hello world');
});

// Post -- Create
app.post('/api/create', (req, res) => {
  try {
    const { fullName, password } = req.body;
    res
      .status(201)
      .send(`Hello my fullName is ${fullName}. My password is ${password}`);
  } catch (error) {
    res.status(500).send(`This is Error -- ${error}`);
  }
});

// connect to db
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL).then(() => {
      console.log('Connected to MongoDB');
    });

    app.listen(port, () =>
      console.log(`listening on http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

connectDb();
