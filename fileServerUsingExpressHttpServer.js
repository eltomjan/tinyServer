const express = require('express');
const app = express();
const restore = require('./restore');

async function load()
{
  await restore.fetchData();

  app.use(express.static("output"));

  app.listen(80);
}

load();

module.exports = app;

