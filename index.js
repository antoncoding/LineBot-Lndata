// for initial webhook verification
var linebot = require('linebot');
var express = require('express');


var bot = linebot({
  channelId: process.env.Line_Channel_ID,
  channelSecret: process.env.Line_Channel_Secret,
  channelAccessToken: process.env.Line_Channel_Access_Token
});

// bot.on('message', function(event) {
//   console.log(event); //把收到訊息的 event 印出來看看
// });


bot.on('message', function (event) {
  event.reply(event.message.text).then(function (data) {
    console.log('Success', data);
  }).catch(function (error) {
    console.log('Error', error);
  });
});

const app = express();
const linebotParser = bot.parser();
app.post('/webhook', linebotParser);

bot.listen('/test', process.env.PORT || 8080, function () {
  console.log('LineBot is running.');
});




//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
// var server = app.listen(process.env.PORT || 8080, function() {
//   var port = server.address().port;
//   console.log("App now running on port", port);
// });
