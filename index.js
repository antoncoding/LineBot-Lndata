var linebot = require('linebot');
var express = require('express');
const bodyParser = require('body-parser');

var bot = linebot({
  channelId: process.env.Line_Channel_ID,
  channelSecret: process.env.Line_Channel_Secret,
  channelAccessToken: process.env.Line_Channel_Access_Token
});

// bot.on('message', function(event) {
//   console.log(event); //把收到訊息的 event 印出來看看
// });

bot.on('message', function (event) {
  console.log('## Message From: ', event.source.userId);
  // bot.push('U6d38c978c5bdd2c68ec3d8dd6f1638a0','Now you see me!');
  console.log('## Message TEXT: ', event.message.text);
  event.reply('event.message.text').then(function (data) {
    console.log('[Success] ', data);
  }).catch(function (error) {
    console.log('[Error] ', error);
  });
});

const app = express();
const linebotParser = bot.parser();
app.post('/webhook', linebotParser);

// Change port on Heroku
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});
