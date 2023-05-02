const functions = require("firebase-functions");
const functions2 = require("firebase-functions/v2");
const firebase = require("firebase");
require("firebase/firestore");

exports.helloWorld = functions.https.onRequest(helloWorld);
exports.helloworldtwo = functions2.https.onRequest(helloWorld);
exports.pubMessage = functions.https.onRequest(pubMessage);
exports.helloPubSub = functions.pubsub.topic("todolistreact-topic").onPublish(helloPubSub);
exports.longSave = functions.https.onRequest(longSave);

const firebaseConfig = {
  // apiKey: "xxx",
  authDomain: "my-todo-list-80d81.firebaseapp.com",
  databaseURL: "https://my-todo-list-80d81.firebaseio.com",
  projectId: "my-todo-list-80d81",
  storageBucket: "my-todo-list-80d81.appspot.com",
  appId: "1:784252133684:web:fd2b01906afce5591f0561",
};

console.log = functions2.logger.info;

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

async function timeout(ms) {
  return new Promise((resolve) => setTimeout(() => {
    resolve();
  }, ms));
}

async function helloWorld(request, response) {
  functions.logger.info(`Good
                         log 1`, {structuredData: true});
  console.log(`Bad
               log 1`, {structuredData: true});
  await timeout(1000);
  functions.logger.info(`Good
                         log 2`, {structuredData: true});
  console.log(`Bad
               log 2`, {structuredData: true});
  if (request.path.endsWith("bug1")) {
    throw new Error("error 1");
  }
  timeout(1000).then(() => {
    functions.logger.info(`Good
                           log 3`, {structuredData: true});
    console.log(`Bad
                 log 3`, {structuredData: true});
    if (request.path.endsWith("bug2") || request.path.endsWith("bug3")) {
      throw new Error("error 2");
    }
  });

  if (request.path.endsWith("bug3")) {
    throw new Error("error 3");
  }

  response.send("Hello from Firebase!");
}

async function pubMessage(request, response) {
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
}

function helloPubSub(message) {
  try {
    const msg = message.json.msg;
    functions.logger.info(`got message from pubsub! - ${msg}`, {structuredData: true});
  } catch (e) {
    functions.logger.error("PubSub message was not JSON", e);
  }
}

async function longSave(request, response) {
  if (request.method === "POST") {
    const x = request.body.x;
    const id = request.body.id;
    console.error(`method ${request.method}`);
    const lockRef = db.collection("todos").doc(id);
    await db.runTransaction(async (transaction) => {
      await timeout(3000);
      if (Math.random() < 0.5) {
        throw new Error("backend error");
      }
      await transaction.update(lockRef, {x: x});
    });
  }

  // response.header('Access-Control-Allow-Origin', 'h
  response.send("ok");
}

