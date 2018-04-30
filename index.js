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

app.get('/', function (req, res) {
    console.log('媽我在這！！');
    res.send('Hello World !!');
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