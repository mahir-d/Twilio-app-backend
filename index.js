const http = require('http');
var express = require('express')
const crypto = require('crypto') // crypto comes with Node.js
const bodyParser = require('body-parser')
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

var app = express()
app.use(bodyParser.json());

// Used when generating any kind of Access Token
const twilioAccountSid = 'AC65c81ab7b6148961732aa27d291d167b';
const twilioApiKey = 'SKe8c4b3a92a2959e48c36c05a0bfe9d6d';
const twilioApiSecret = 'WxGPsBnYatpiWg4CgzLkZFMJdru27Kio';

var flag = true

const hostname = '127.0.0.1';
const port = 3001;



app.get('/', function (req, res) {
    console.log("hello")
    res.send("Hello")
})

app.get('/gettwilioaccesstoken', function (req, res) {
    const data = req.query.identity
    console.log(data)
    const token = new AccessToken(twilioAccountSid, twilioApiKey, twilioApiSecret);
    // token.identity = data;
    token.identity = flag ? "local" : "remote"
    flag = !flag
    // Create a Video grant which enables a client to use Video 
    // and limits access to the specified Room (DailyStandup)
    const videoGrant = new VideoGrant();

    // Add the grant to the token
    token.addGrant(videoGrant);

    // Serialize the token to a JWT string
    console.log(token);
    res.send(token.toJwt())
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});






// Create an access token which we will sign and return to the client,
// containing the grant we just created
