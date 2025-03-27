const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user.model');

require('dotenv').config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 8080;

// Read -- get
app.get('/api/get', async (req, res) => {
  try {
    const getAllUser = await User.find();
    res.status(200).send(getAllUser);
  } catch (error) {
    res.status(500).send(`This is Error -- ${error}`);
  }
});

// Post -- Create
app.post('/api/create', async (req, res) => {
  try {
    const { fullName, password, email } = req.body;
    const user = await User.create({ fullName, password, email });
    res.status(201).send(user);
  } catch (error) {
    res.status(501).send(`This is Error -- ${error}`);
  }
});

// connect to db
const connectDb = () => {
  try {
    mongoose
      .connect(process.env.DB_URL)
      .then(() => console.log('Connected to DB'));

    app.listen(port, () =>
      console.log(`listening on http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

connectDb();
