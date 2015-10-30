import test from 'ava';
import fn from './';

var sampleMessageSNS = {"Records": [{"EventVersion": "1.0", "EventSubscriptionArn": "arn:aws:sns:EXAMPLE", "EventSource": "aws:sns", "Sns": {"SignatureVersion": "1", "Timestamp": "1970-01-01T00:00:00.000Z", "Signature": "EXAMPLE", "SigningCertUrl": "EXAMPLE", "MessageId": "95df01b4-ee98-5cb9-9903-4c221d41eb5e", "Message": "Hello from SNS!", "MessageAttributes": {"Test": {"Type": "String", "Value": "TestString"}, "TestBinary": {"Type": "Binary", "Value": "TestBinary"} }, "Type": "Notification", "UnsubscribeUrl": "EXAMPLE", "TopicArn": "arn:aws:sns:EXAMPLE", "Subject": "TestInvoke"} } ] };
var messageString = "Hello from SNS!";
var sampleJSON = {};
sampleJSON = {
  a: 'string',
  b: 'anotherString',
  c: ['a', 'b', 'c'],
  d: [{
    a: 'string',
    b: ['a', 'b', 'c'],
    c: {
      a: 'b',
      c: 'd'
    }
  }],
  e: {
    a: 'a',
    b: 'b',
    c: ['a', 'b', 'c'],
    d: {
      a: 'a',
      b: 'b'
    }
  }
};
var sampleJSONSNS = sampleMessageSNS;


// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

test('string return', t => {
  t.is(fn(sampleMessageSNS), messageString);
  t.end();
});

test('json return', t => {
  sampleJSONSNS.Records[0].Sns.Message = JSON.stringify(sampleJSON);
  t.same(fn(sampleJSONSNS), sampleJSON);
  t.end();
});

test('multiple string records', t => {
  var sampleMultiStringRecordSNS = sampleMessageSNS;
  sampleMultiStringRecordSNS.Records[1] = sampleMultiStringRecordSNS.Records[0];
  // var response = fn(sampleMultiStringRecordSNS);
  t.same(fn(sampleMultiStringRecordSNS)[0], messageString);

  // t.is(response[0], messageString);
  // t.is(response[1], messageString);
  t.end();
});

// test('multiple json records', t => {
//   var sampleMultiRecordSNS = sampleMessageSNS;
//   sampleMultiRecordSNS.Records[0].Sns.Message = JSON.stringify(sampleJSON);
//   sampleMultiRecordSNS.Records[1] = sampleMultiRecordSNS.Records[0];
//   t.is(fn(sampleMultiRecordSNS), [sampleJSON, sampleJSON]);
//   t.end();
// });

// test('multiple records mixed', t => {
//   var sampleMultiRecordSNS = sampleMessageSNS;
//   sampleMultiRecordSNS.Records[1] = sampleMultiRecordSNS.Records[0];
//   sampleMultiRecordSNS.Records[1].Sns.Message = JSON.stringify(sampleJSON);
//   t.is(fn(sampleMultiRecordSNS), [messageString, sampleJSON]);
//   t.end();
// });
