const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
dotenv.config();

const PORT = 8001;

const app = express();

app.listen(PORT, async () => {
  console.log(`server up on port ${PORT}`);
});
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const router = require('./ routes/router');
app.use(router);
require('./mongoDB/config');

module.exports = app;
