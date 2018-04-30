var linebot = require('linebot');
var express = require('express');
var getJSON = require('get-json');

var bot = linebot({
    channelId: process.env.CHANNEL_ID,
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

var pm = [];
_getJSON();

var app = express();
var linebotParser = bot.parser();

app.get('/', function (req, res) {
    console.log('媽我在這！！');
    res.send('Hello World !!');
});

app.post('/linewebhook', linebotParser);

bot.on('message', function (event) {
    if (event.message.type == 'text') {
        var msg = event.message.text;
        var replyMsg = '';
        if (msg.indexOf('PM2.5') != -1) {
            pm.forEach(function (e, i) {
                if (msg.indexOf(e[0]) != -1) {
                    replyMsg = e[0] + '的 PM2.5 數值為 ' + e[1];
                }
            });
            if (replyMsg == '') {
                replyMsg = '請輸入正確的地點';
            }
        }
        if (replyMsg == '') {
            replyMsg = '不知道「' + msg + '」是什麼意思 :p';
        }

        event.reply(replyMsg).then(function (data) {
            console.log(replyMsg);
        }).catch(function (error) {
            console.log('error');
        });
    }
});

app.listen(process.env.PORT || 80, function () {
    console.log('LineBot is running.');
});

function _getJSON() {
    console.log('Function Start...');
    getJSON('http://opendata2.epa.gov.tw/AQX.json', function (error, response) {
        response.forEach(function (e, i) {
            pm[i] = [];
            pm[i][0] = e.SiteName;
            pm[i][1] = e['PM2.5'] * 1;
            pm[i][2] = e.PM10 * 1;
        });
    });
    console.log('Function End...');
}