const express = require('express');
const app = express();
const restore = require('./restore');
const fs = require('fs');

function scheduleFunction(hour, minute, second, func) {
  const now = new Date();

  const scheduledTime = new Date();
  scheduledTime.setHours(hour);
  scheduledTime.setMinutes(minute);
  scheduledTime.setSeconds(second);

  if (now > scheduledTime) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
  }
  const delay = scheduledTime.getTime() - now.getTime();

  console.log("Scheduling next function call: " + scheduledTime.toString());

  setTimeout(async () => {
      await func();
      scheduleFunction(hour, minute, second, func);
  }, delay);
}

async function load()
{
  const dataDir = "output/data"
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  scheduleFunction(10, 0, 0, async () => {
    await restore.fetchData();
  });
  await restore.fetchData();

  app.use(express.static("output"));

  app.listen(443);
}

load();

module.exports = app;

