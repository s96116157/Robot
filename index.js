const linebot = require('linebot');
const express = require('express');

const bot = linebot({
    channelId: process.env.CHANNEL_ID,
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

const app = express();

const linebotParser = bot.parser();

app.get('/',function(req,res){
    res.send('Hello World!!!!!!!!!!  YA!! YA!! YA!!');
});

app.post('/linewebhook', linebotParser);


bot.on('message', function (event) {
    switch (event.message.type) {
        case 'text':
            switch (event.message.text) { 
                case '早安':
                    event.source.profile().then(function (profile) {
                        return event.reply([
                            { type: 'text', text: '早安！' + profile.displayName + ' 平安喜樂！' },
                            {
                                type: 'image',
                                originalContentUrl: 'https://i.imgur.com/0dBUGqP.jpg?1',
                                previewImageUrl: 'https://i.imgur.com/0dBUGqP.jpg?1'
                            }
                        ]);
                        //return event.reply('哈囉！' + profile.displayName + ' ' + profile.userId);
                    });
                    break;
                case 'Meeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee':
                    event.source.profile().then(function (profile) {
                        return event.reply([
                            { type: 'text', text: '哈囉！' + profile.displayName + ' 您好！' },
                            {
                                type: 'image',
                                originalContentUrl: 'https://imgur.com/gallery/0dBUGqP',
                                previewImageUrl: 'https://imgur.com/gallery/0dBUGqP'
                            }
                        ]);
                        //return event.reply('哈囉！' + profile.displayName + ' ' + profile.userId);
                    });
                    break;
                case 'Memberrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr':
                    event.source.member().then(function (member) {
                        return event.reply(JSON.stringify(member));
                    });
                    break;
                case 'Pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee':
                    event.reply({
                        type: 'image',
                        originalContentUrl: 'https://d.line-scdn.net/stf/line-lp/family/en-US/190X190_line_me.png',
                        previewImageUrl: 'https://d.line-scdn.net/stf/line-lp/family/en-US/190X190_line_me.png'
                    });
                    break;
                case 'Locationnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn':
                    event.reply({
                        type: 'location',
                        title: 'LINE Plus Corporation',
                        address: '1 Empire tower, Sathorn, Bangkok 10120, Thailand',
                        latitude: 13.7202068,
                        longitude: 100.5298698
                    });
                    break;
                case 'Push':
                    //bot.push('U17448c796a01b715d293c34810985a4c', ['Hey!', 'สวัสดี ' + String.fromCharCode(0xD83D, 0xDE01)]);
                    break;
                case 'Push2':
                    //bot.push('Cba71ba25dafbd6a1472c655fe22979e2', 'Push to group');
                    break;
                case 'Multicast':
                    //bot.push(['U17448c796a01b715d293c34810985a4c', 'Cba71ba25dafbd6a1472c655fe22979e2'], 'Multicast!');
                    break;
                case 'Confirmmmmmmmmmmmmmmmmmmmmmmmmmmmmm':
                    event.reply({
                        type: 'template',
                        altText: 'this is a confirm template',
                        template: {
                            type: 'confirm',
                            text: 'Are you sure?',
                            actions: [{
                                type: 'message',
                                label: 'Yes',
                                text: 'yes'
                            }, {
                                type: 'message',
                                label: 'No',
                                text: 'no'
                            }]
                        }
                    });
                    break;
                case 'bey':
                    event.source.member().then(function (member) {
                        return event.reply([  
                            { type: 'text', text: '哈囉！' },
                            { type: 'text', text: '不要這樣嘛～' }
                        ])
                    });
                    // line.client.leaveGroup(member.memberIds);
                    break;
                case 'Version':
                    //event.reply('linebot@' + require('../package.json').version);
                    break;
                default:
                   
                    break;
            }
            break;
        case 'image':           
            break;
        case 'video':
            //event.reply('Nice video!');
            break;
        case 'audio':
            //event.reply('Nice audio!');
            break;
        case 'location':
            //event.reply(['That\'s a good location!', 'Lat:' + event.message.latitude, 'Long:' + event.message.longitude]);
            break;       
        default:
            //event.reply('Unknow message: ' + JSON.stringify(event));
            break;
    }
});

app.listen(process.env.PORT || 80, function () {
    console.log('LineBot is running.');
});