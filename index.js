var linebot = require('linebot');
var express = require('express');
const bodyParser = require('body-parser');

var bot = linebot({
  channelId: process.env.Line_Channel_ID,
  channelSecret: process.env.Line_Channel_Secret,
  channelAccessToken: process.env.Line_Channel_Access_Token,
  verify: true

});

bot.on('message', function (event) {
  console.log('## Message From: ', event.source.userId);
  bot.push('U6d38c978c5bdd2c68ec3d8dd6f1638a0','Now you see me!');
  switch (event.message.type) {
        case 'text':
            console.log('## Message: ', event.message.text)
            switch (event.message.text) {
                case 'Me':
                    event.source.profile().then(function (profile) {
                        return event.reply('Hello ' + profile.displayName + ' ' + profile.userId);
                    });
                    break;
                case 'Group':
                    return event.reply(event.source.groupId);
                    break;
                case 'Member':
                    event.source.member().then(function (member) {
                        return event.reply(JSON.stringify(member));
                    });
                    break;
                case 'Picture':
                    event.reply({
                        type: 'image',
                        originalContentUrl: 'https://d.line-scdn.net/stf/line-lp/family/en-US/190X190_line_me.png',
                        previewImageUrl: 'https://d.line-scdn.net/stf/line-lp/family/en-US/190X190_line_me.png'
                    });
                    break;
                // case 'Push':
                    // bot.push('U6d38c978c5bdd2c68ec3d8dd6f1638a0', 'Push to group');
                    // break;
                default:
                    console.log('卍卍卍卍 不知道要幹麻 卍卍卍卍');
            }
            break;
        case 'image':
            event.source.profile().then(function (profile) {
                event.message.content().then(function (data) {
                    const s = data.toString('hex').substring(0, 32);
                    return event.reply('哇!快來看 ' + profile.displayName + ' 上傳了好棒的照片耶~');
                }).catch(function (err) {
                    return event.reply(err.toString());
                });
            });
            break;
        case 'video':
            event.source.profile().then(function (profile) {
                return event.reply('哇!快來看 ' + profile.displayName + ' 上傳了好棒的影片耶~');
            });
            break;
        case 'audio':
            event.reply('Nice audio!');
            break;
        case 'location':
            event.reply(['That\'s a good location!', 'Lat:' + event.message.latitude, 'Long:' + event.message.longitude]);
            break;
        case 'sticker':
            event.reply({
              type: 'sticker',
              packageId: 1,
              stickerId: 1
            });
            break;
        default:
            event.reply('Unknow message: ' + JSON.stringify(event));
            break;
    }
});

const app = express();
const linebotParser = bot.parser();
app.post('/webhook', linebotParser);

// Change port on Heroku
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});
