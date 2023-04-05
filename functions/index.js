const functions = require("firebase-functions");

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.pubMessage = functions.https.onRequest(async (request, response) => {
  const {PubSub} = require("@google-cloud/pubsub");
  const pubSubClient = new PubSub();
  const topicName = "todolistreact-topic";
  const dataBuffer = Buffer.from(JSON.stringify({msg: "Hello from pubMessage!"}));
  let msg = null;
  try {
    functions.logger.info("sending...", {structuredData: true});
    const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
    msg = `Message ${messageId} published.`;
  } catch (error) {
    msg = `Received error while publishing: ${error.message}`;
  }
  functions.logger.info(msg, {structuredData: true});
  response.send(msg);
});

exports.helloPubSub = functions.pubsub.topic("todolistreact-topic").onPublish((message) => {
  try {
    const msg = message.json.msg;
    functions.logger.info(`got message from pubsub! - ${msg}`, {structuredData: true});
  } catch (e) {
    functions.logger.error("PubSub message was not JSON", e);
  }
});
