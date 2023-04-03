import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
    // apiKey: "xxx",
    authDomain: "my-todo-list-80d81.firebaseapp.com",
    databaseURL: "https://my-todo-list-80d81.firebaseio.com",
    projectId: "my-todo-list-80d81",
    storageBucket: "my-todo-list-80d81.appspot.com",
    appId: "1:784252133684:web:fd2b01906afce5591f0561",
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();