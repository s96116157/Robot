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
    var project = "AKfycbzGYm641yIGwZ0Vb9a_jXiKoVOooYZfoXWJAprggzC4G0FbR6YM";
    var sheet_name = "From_002"
    //var url = "https://script.google.com/macros/s/" + project + "/exec?id=" + sheet_id + "&sheet=" + sheet_name;
   // var url = "https://script.google.com/macros/s/AKfycbzGYm641yIGwZ0Vb9a_jXiKoVOooYZfoXWJAprggzC4G0FbR6YM/exec?id=1X5Mtln-MYBhyBRn0RveNOXCkb32A4VTzht1AIGkNvdU&sheet=From_002"
    var url = "https://script.googleusercontent.com/macros/echo?user_content_key=2KtuSbS26jWQtTCeVVCLxRogMNcs9Q3J6rZG2Wyplr8DVqdCtWjDwvFeNKxgK6-7ijZ3E3ezcRaPlPsVDdBDz04GvLV9SLn8OJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHa9kwxyVAdOctIYg4SBSdu9k-m3IS2J5xHgKvKyWLLaSDbNf0LmFKQpTt56_yJz549EKQLumG9TUsY7O6EXi9VUxCG0BDbUzq3s9njy9H1eM991tXI9T9B6smYauuRThZH_FtbzwwXe895tYrEq1gHrFvqrVIJO7UzQ&lib=M8N87m5Wgvt1ePBAUHd3fUw2OPgjxcCW0";
    var url2 = "http://opendata2.epa.gov.tw/AQX.json";

    console.log('Function Start... v.003');
    getJSON(url, function (error, response) {
        console.log(response);
        response.forEach(function (e, i) {
            pm[i] = [];
            pm[i][0] = e.SYSID;
            pm[i][1] = e.Form_ID;
            //pm[i] = [];
            //pm[i][0] = e.SiteName;
            //pm[i][1] = e['PM2.5'] * 1;
            //pm[i][2] = e.PM10 * 1;
        });
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