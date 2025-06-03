
import firebase from 'firebase/compat/app';
import 'firebase/compat/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfYDQif_9Snxvd99AxhI1FOth-6umY9ZM",
  authDomain: "bes-dsp-app.firebaseapp.com",
  projectId: "bes-dsp-app",
  storageBucket: "bes-dsp-app.appspot.com",
  messagingSenderId: "799901107375",
  appId: "1:799901107375:web:185c500ff957100002c05a",
  measurementId: "G-LYVZ4JMQ60"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

let analytics;
if (typeof window !== 'undefined') {
  analytics = firebase.analytics();
} else {
  analytics = null;
}

const auth = firebase.auth();
const db = firebase.firestore();

export { app, analytics, auth, db };
