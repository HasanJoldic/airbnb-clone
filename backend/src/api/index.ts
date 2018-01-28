import "../polyfills"; // vital, must be injected in every entry node process entry point
import Api from "./Api";

/*
var accountSid = 'AC0394220ecb7558bdea01d162c0eb4c8e'; // Your Account SID from www.twilio.com/console
var authToken = '082b43637e9bb5b5c984f8a306224235';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'Whats up baby a?',
    to: '+38762396551',  // Text this number
    from: '+43676800200230' // From a valid Twilio number
})
.then((message) => console.log(message));
*/

// Start the server if run as "node index.js" automatically
//if (!module.parent) {
//    const api = new Api();
//}