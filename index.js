'use strict';

module.exports = function(event) {
  var messages = [];
  (event.Records || []).forEach(function(record) {
    if (record.Sns) {
      var parsed = {};
      var text = '';
      try {
        parsed = JSON.parse(record.Sns.Message);
        messages.push(parsed);
      }
      catch(e) {
        text = record.Sns.Message;
        messages.push(text);
      }
    }
  });
  if (messages.length == 1) {
    return messages[0];
  }
  else {
    return messages;  
  }
};
