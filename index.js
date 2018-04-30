var linebot = require('linebot');
var express = require('express');
var getJSON = require('get-json');

var bot = linebot({
    channelId: process.env.CHANNEL_ID,
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

var app = express();

app.get('/', function (req, res) {
    console.log('媽我在這！！');
    res.send('Hello World !!');
});

app.listen(process.env.PORT || 80, function () {
    console.log('LineBot is running.');
});
