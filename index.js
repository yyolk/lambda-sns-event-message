'use strict';

module.exports = function(event) {
  return JSON.parse(event.Records[0].Sns.Message);
};
