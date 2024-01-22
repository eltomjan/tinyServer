const express = require('express');
const app = express();
const restore = require('./restore');
const fs = require('fs');

async function load()
{
  const dataDir = "output/data"
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  await restore.fetchData();

  app.use(express.static("output"));

  app.listen(443);
}

load();

module.exports = app;

