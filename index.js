var tmi = require('tmi.js');
var request = require('request');
const express = require('express');
const app = express();
const userChannel = process.env.CHANNEL;

var ans;
var options = {
        options: {
                debug: true
        },
        connection: {
                reconnect: true
        },
        identity: {
                username: process.env.USERNAME,
                password: process.env.OAUTH_TOKEN
        },
        channels: [userChannel]
};

var client = new tmi.client(options);
// Connect the client to the server
client.connect();
client.on('chat', function(channel, userstate, message, self){
        if(message.includes("@"+process.env.USERNAME)){ // checking if SUSI is tagged
             client.action(userChannel, `Hi, I'm SUSI. use @${process.env.USERNAME} fdsfdsgs.`);
});

client.on('connected', function(address, port){
        client.action(userChannel, `Hi, I'm SUSI. Mention me using @${process.env.USERNAME} to chat with me.`);
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log(`Listening on ${port}`);
});
