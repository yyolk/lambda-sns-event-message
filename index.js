'use strict';

module.exports = function(event) {
  var message = JSON.parse(event.Records[0].Sns.Message);
  return message;
};
