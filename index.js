const linebot = require('linebot');
const express = require('express');
const bodyParser = require('body-parser');

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

const app = bot.parser();

// app.get('/',function(req,res) {
//    res.send("hello world!");
//  })

app.post('/webhook', linebotparser);

bot.on('message', function (event) {
  console.log(event.message.text);
  event.reply(event.message.text).then(function (data) {
    console.log('Success', data);
  }).catch(function (error) {
    console.log('Error', error);
  });
});

app.listen(process.env.PORT || 80, function () {
  console.log('LineBot is running.');
});
