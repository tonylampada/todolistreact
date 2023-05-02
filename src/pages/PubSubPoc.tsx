// import React, { useState } from "react";
// import firebase from "firebase/app";
import "firebase/messaging";
import axios from "axios";

function PubSubPoc() {


  // chatGPT gave me this.
  // message.send doesn't exist
  // -----------------------------
  // async function pubMessage() {
  //   const messaging = firebase.messaging();
  //   const messageData = {
  //     data: {
  //       message: "Hello from web pub sub",
  //     },
  //     topic: "todolistreact-topic",
  //   };
  //   console.log("sending...")
  //   // const response = await messaging.send(messageData);
  //   debugger;
  //   console.log(messaging);
  //   console.log("sent!")
  // }

  // the docs give me this.
  // but it only works server side
  // -----------------------------
  // async function pubMessage() {
    // const pubSubClient = new PubSub();
    // const topicName = "todolistreact-topic";    
    // const dataBuffer = Buffer.from("Hello from web pub sub");
    // try {
    //   console.log("sending")
    //   const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
    //   console.log(`Message ${messageId} published.`);
    // } catch (error: any) {
    //   console.error(`Received error while publishing: ${error.message}`);
    //   process.exitCode = 1;
    // }
  // }

  async function pubMessage(){
    const response = await axios.post("/api/pubMessage")
    console.log(response.status, response.data)
  }

  return (
    <div>
      <button onClick={pubMessage}>Click to publish a message to a GCP topic (and look at the js console, pls)</button>
    </div>
  );
}

export default PubSubPoc;
