const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));

const port = process.env.PORT || 8080;

// Router
app.use('/api/card', require('./routes/card.route'));
app.use('/api/auth', require('./routes/auth.route'));

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
