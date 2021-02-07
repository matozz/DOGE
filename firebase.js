import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClfbJBCMbObj9kBpBGX9Tvz03BlXHACco",
  authDomain: "signal-clone-961b9.firebaseapp.com",
  projectId: "signal-clone-961b9",
  storageBucket: "signal-clone-961b9.appspot.com",
  messagingSenderId: "276836612479",
  appId: "1:276836612479:web:bd887c5ef16f20913b024a",
  measurementId: "G-QLGKHS24DH",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
