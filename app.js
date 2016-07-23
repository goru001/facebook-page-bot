// Please Fill out Following info that you got while creating facebook page.
//	PAGE_ACCESS_TOKEN = 
//	VERIFICATION_TOKEN = 


var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var request = require('request')
//For sms
var PythonShell = require('python-shell');
var shell = new PythonShell('sms.py',{ mode: 'text '});

app.use(bodyParser.json())

//testing that modulus works
app.get('/hello', function(req, res) {
   res.send('hello');
});


// Facebook verification
app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === VERIFICATION_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }  
});

// Real Code

app.post('/webhook', function (req, res) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object == 'page') {
    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach(function(pageEntry) {
      var pageID = pageEntry.id;
      var timeOfEvent = pageEntry.time;

      // Iterate over each messaging event
      pageEntry.messaging.forEach(function(messagingEvent) {
		if (messagingEvent.message && messagingEvent.message.text) {
          receivedMessage(messagingEvent);
        } 
      });
    });

    res.sendStatus(200);
  }
});

function receivedMessage(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:", 
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var messageId = message.mid;

  // You may get a text or attachment but not both
  var messageText = message.text;
  // Sending sms
  shell.send(messageText);
  
//  shell.receive(message);
  
	//  console.log(message);
	  // upar wali do line chal pde toh mza hi ajaye
     // if (message=="success")
	  //{		    
		var reply = 'Wanna say anything else..? Anyways, Gaurav will get back to you, soon!'
		sendTextMessage(senderID, reply);
	  //}
	  //else
	  //{
		//var reply = 'Oops! Some Error Occured. Please try again. If this is happening again and again,try sending gaurav an Email at giganticgemmic@gmail.com'
		//sendTextMessage(senderID, reply);
	 // }  

}

function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };
 // console.log('Recepient ID is %s',recipientId);
  callSendAPI(messageData);
}

function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s", 
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });  
}

app.listen(process.env.PORT || 3000)
