var linebot = require('linebot');
var express = require('express');

var bot = linebot({
  channelId: '1501563220',
  channelSecret: '225b6427eb00f5ab6a7db90a7244b893',
  channelAccessToken: 'EXUXNZCjK33qI1O9Rmgq5R3CMnzIMfB1Z93LDyuOyeODKLSECo/PdEITLWMWMaP9SVYXkSTzjhdeKHMGFiZIq6/B/emRhYhrHxqMNSrewD7WsJJ6xIwLmeH2rFPoy2coPCOyEtrX4efmO5nDCiBs6wdB04t89/1O/w1cDnyilFU='
});

bot.on('message', function(event) {
  console.log(event); //把收到訊息的 event 印出來看看
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});
