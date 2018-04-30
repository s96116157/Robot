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
            console.log('LINE BOT 執行讀取訊息！！');

            switch (event.message.text) {
                case 'bye':
                    event.source.profile().then(function (profile) {
                        event.reply([
                            { type: 'text', text: '輕輕的我走了，就如我輕輕的來～' }
                        ])
                        var gid = profile.groupId;

                        console.log('GroupID : ' + gid);

                        bot.leaveGroup(gid); //退出群組
                        bot.leaveRoom(gid); //退出聊天室
                    });

                    break;
                default:

                    break;
            }
            // replyMsg = '不知道「' + msg + '」是什麼意思 :p';
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

    var sheet_id = "1X5Mtln-MYBhyBRn0RveNOXCkb32A4VTzht1AIGkNvdU";
    var project = "AKfycbxOLElujQcy1 - ZUer1KgEvK16gkTLUqYftApjNCM_IRTL3HSuDk";
    var sheet_name = "From_002"
    var url = "https://script.google.com/macros/s/" + project + "/exec?id=" + sheet_id + "&sheet=" + sheet_name;

    var url2 = "http://opendata2.epa.gov.tw/AQX.json";

    console.log('Function Start... v.002');
    getJSON(url, function (error, response) {

        console.log(response.From_002);

        //response.forEach(function (e, i) {
        //    pm[i] = [];
        //    pm[i][0] = e.SiteName;
        //    pm[i][1] = e['PM2.5'] * 1;
        //    pm[i][2] = e.PM10 * 1;
        //});
    });
    console.log('Function End...');
}

function sleep(time) {
    console.log("SLEEP");
    var now = new Date();
    var end = new Date();
    while ((end - now) < time) {
        end = new Date();
    }
    console.log("SLEEP END");
}