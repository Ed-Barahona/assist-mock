'use strict';

const config     = require('config');
const express    = require('express');
const http       = require('http');
const https      = require('https');
const bodyParser = require('body-parser');
const app        = express();
const port       = config.get('port');

// Domain Access Control
const ALLOWED_DOMAINS = (process.env.ALLOWED_DOMAINS) ?
  (process.env.ALLOWED_DOMAINS) :
  config.get('allowed_domains');

app.use(bodyParser.json());

app.set('port', process.env.PORT || config.get('port'));




// Data Stores - Schemaless
let counter = {
    type: 'message',
    count: 0
};

let fbMessages = [];


// API Routes
app.get('/facebook/me/count', function(req, res, next){
    res.status(200).json(counter);
});

app.get('/facebook/me/count/reset', function(req, res, next){
    resetCounter();
    res.status(200).json({
        message: 'Counter has been reset'
    });
});

app.post('/facebook/me/messages', function(req, res, next){
    
    const fbMessage = req.body;
    
    pushMessage(fbMessage)
    
    res.status(200).json({
        message: 'message received', 
        message_data: fbMessage
    });
});

app.get('/facebook/me/messages', function(req, res, next){
    
    res.status(200).json({
        messages: fbMessages
    });
});

app.get('/facebook/me/messages/reset', function(req, res, next){
    resetMessages();
    res.status(200).json({
        message: 'Messages have been deleted'
    });
});

app.get('/facebook/me/reset', function(req, res, next){
    resetMessages();
    resetCounter();
    res.status(200).json({
        message: 'Messages and counter have been reset'
    });
});


// API Helpers
const pushMessage = function(message){
    fbMessages.push(message);
    counter.count ++;
    messageHandler(message);
}

function messageHandler(event){
  
  if(!event.message){
      return;
  }
    
  const fbLikeSticker       = '369239263222822',
        fbLikeStickerMedium = '369239343222814',
        fbLikeStickerBig    = '369239383222810';

  if (event.message.quick_reply && event.message.quick_reply.payload){
    counter.type ='quick reply';
  } else if (event.message.text){
    counter.type = 'text';
  } else if (event.message.attachments){
    counter.type = 'attachment';
  } else {
    counter.type = 'unknown type';
  }
}

function resetCounter(){
    counter.count = 0;
    counter.type = null;
}

function resetMessages(){
    fbMessages = [];
}

// Response Handlers
// Success 
function success(response, data) {
    response.writeHead(200, {
        "Content-Type" : "application/json"
    });
    
    response.end(JSON.stringify({
        error : null,
        data : data
    }));
}

// Failure 
function failure(response, err) {
    response.writeHead(err.code, {
        "Content-Type" : "application/json"
    });
    response.end(JSON.stringify({
        error : err.code,
        message : err.message
    }));
}

const server = app.listen(app.get('port'), function() {
    console.log('Assist Mock Services Running On Port: ', port);
});