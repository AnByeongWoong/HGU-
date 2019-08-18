import firestore from "firebase/firestore";
import * as firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBMa-f8eBp4hH1HymINrluLREBpQp2afpQ",
  authDomain: "lasthgufood.firebaseapp.com",
  databaseURL: "https://lasthgufood.firebaseio.com",
  projectId: "lasthgufood",
  storageBucket: "lasthgufood.appspot.com",
  messagingSenderId: "835651036952",
  appId: "1:835651036952:web:e88df6a9f7cf433e"
};
// Initçialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


export { db };