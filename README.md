# lambda-sns-event-message [![Build Status](https://travis-ci.org/yyolk/lambda-sns-event-message.svg?branch=master)](https://travis-ci.org/yyolk/lambda-sns-event-message)
Utility function for returning the `Message:` portion of an SNS invocation of lambda

## Install
```sh
$ npm install --save lambda-sns-event-message
```

## Usage
For when you just need the message portion of an SNS event:

Pass in the SNS `event`:
```js
var parseSNSMessage = require('lambda-sns-event-message');

exports.handler = function(event, context) {
  var snsMessage = parseSNSMessage(event);
};
```