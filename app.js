const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 8080;

// Router
app.use('/api/user', require('./routes/user.route'));

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
