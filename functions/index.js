const functions = require("firebase-functions");
const firebase = require("firebase");
require("firebase/firestore");

const firebaseConfig = {
  // apiKey: "xxx",
  authDomain: "my-todo-list-80d81.firebaseapp.com",
  databaseURL: "https://my-todo-list-80d81.firebaseio.com",
  projectId: "my-todo-list-80d81",
  storageBucket: "my-todo-list-80d81.appspot.com",
  appId: "1:784252133684:web:fd2b01906afce5591f0561",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

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

exports.longSave = functions.https.onRequest(async (request, response) => {
  async function timeout(ms) {
    return new Promise((resolve) => setTimeout(() => {
      resolve();
    }, ms));
  }

  const x = request.body.x;
  const lockRef = db.collection("todos").doc("1680486886477");
  await db.runTransaction(async (transaction) => {
    await timeout(3000);
    await transaction.update(lockRef, {x: x});
  });
  response.send("ok");
});
