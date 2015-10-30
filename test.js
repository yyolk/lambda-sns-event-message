import test from 'ava';
import fn from './';



test('string return', t => {

  const sampleMessageSNS = {"Records": [{"EventVersion": "1.0", "EventSubscriptionArn": "arn:aws:sns:EXAMPLE", "EventSource": "aws:sns", "Sns": {"SignatureVersion": "1", "Timestamp": "1970-01-01T00:00:00.000Z", "Signature": "EXAMPLE", "SigningCertUrl": "EXAMPLE", "MessageId": "95df01b4-ee98-5cb9-9903-4c221d41eb5e", "Message": "Hello from SNS!", "MessageAttributes": {"Test": {"Type": "String", "Value": "TestString"}, "TestBinary": {"Type": "Binary", "Value": "TestBinary"} }, "Type": "Notification", "UnsubscribeUrl": "EXAMPLE", "TopicArn": "arn:aws:sns:EXAMPLE", "Subject": "TestInvoke"} } ] };
  const messageString = "Hello from SNS!";


  t.is(fn(sampleMessageSNS), messageString);
  t.pass();
  t.end();
});


test('json return', t => {
    // var sampleJSON = {};
  const sampleJSON = {
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
  const sampleJSONString = JSON.stringify(sampleJSON);
  var sampleJSONSNS = {};
  sampleJSONSNS = {"Records": [{"EventVersion": "1.0", "EventSubscriptionArn": "arn:aws:sns:EXAMPLE", "EventSource": "aws:sns", "Sns": {"SignatureVersion": "1", "Timestamp": "1970-01-01T00:00:00.000Z", "Signature": "EXAMPLE", "SigningCertUrl": "EXAMPLE", "MessageId": "95df01b4-ee98-5cb9-9903-4c221d41eb5e", "Message": "Hello from SNS!", "MessageAttributes": {"Test": {"Type": "String", "Value": "TestString"}, "TestBinary": {"Type": "Binary", "Value": "TestBinary"} }, "Type": "Notification", "UnsubscribeUrl": "EXAMPLE", "TopicArn": "arn:aws:sns:EXAMPLE", "Subject": "TestInvoke"} } ] };
  sampleJSONSNS.Records[0].Sns.Message = sampleJSONString;
  t.same(fn(sampleJSONSNS), sampleJSON);
  t.end();
});


test('multiple string records', t => {
  const messageString = "Hello from SNS!";
  var sampleMultiStringRecordSNS =  {"Records": [{"EventVersion": "1.0", "EventSubscriptionArn": "arn:aws:sns:EXAMPLE", "EventSource": "aws:sns", "Sns": {"SignatureVersion": "1", "Timestamp": "1970-01-01T00:00:00.000Z", "Signature": "EXAMPLE", "SigningCertUrl": "EXAMPLE", "MessageId": "95df01b4-ee98-5cb9-9903-4c221d41eb5e", "Message": "Hello from SNS!", "MessageAttributes": {"Test": {"Type": "String", "Value": "TestString"}, "TestBinary": {"Type": "Binary", "Value": "TestBinary"} }, "Type": "Notification", "UnsubscribeUrl": "EXAMPLE", "TopicArn": "arn:aws:sns:EXAMPLE", "Subject": "TestInvoke"} } ] };
  sampleMultiStringRecordSNS.Records[1] = sampleMultiStringRecordSNS.Records[0];
  t.same(fn(sampleMultiStringRecordSNS), [messageString, messageString]);
  t.end();
});

test('multiple json records', t => {
  const sampleJSON = {
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
  const sampleJSONString = JSON.stringify(sampleJSON);
  var sampleJSONSNS = {};
  sampleJSONSNS = {"Records": [{"EventVersion": "1.0", "EventSubscriptionArn": "arn:aws:sns:EXAMPLE", "EventSource": "aws:sns", "Sns": {"SignatureVersion": "1", "Timestamp": "1970-01-01T00:00:00.000Z", "Signature": "EXAMPLE", "SigningCertUrl": "EXAMPLE", "MessageId": "95df01b4-ee98-5cb9-9903-4c221d41eb5e", "Message": "Hello from SNS!", "MessageAttributes": {"Test": {"Type": "String", "Value": "TestString"}, "TestBinary": {"Type": "Binary", "Value": "TestBinary"} }, "Type": "Notification", "UnsubscribeUrl": "EXAMPLE", "TopicArn": "arn:aws:sns:EXAMPLE", "Subject": "TestInvoke"} } ] };
  sampleJSONSNS.Records[0].Sns.Message = sampleJSONString;

  var sampleMultiRecordSNS = sampleJSONSNS;
  sampleMultiRecordSNS.Records[1] = sampleMultiRecordSNS.Records[0];
  t.same(fn(sampleMultiRecordSNS), [sampleJSON, sampleJSON]);
  t.end();
});

// test('multiple records mixed', t => {
//   var sampleMultiRecordSNS = sampleMessageSNS;
//   sampleMultiRecordSNS.Records[1] = sampleMultiRecordSNS.Records[0];
//   sampleMultiRecordSNS.Records[1].Sns.Message = JSON.stringify(sampleJSON);
//   t.is(fn(sampleMultiRecordSNS), [messageString, sampleJSON]);
//   t.end();
// });
