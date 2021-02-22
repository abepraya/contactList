import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBOzKvbWQhbnDu0grusvGVioytXJgwdpuA",
    authDomain: "namelistapp.firebaseapp.com",
    databaseURL: "https://namelistapp-default-rtdb.firebaseio.com",
    projectId: "namelistapp",
    storageBucket: "namelistapp.appspot.com",
    messagingSenderId: "352110602845",
    appId: "1:352110602845:web:1094213b75614421fc3bb4",
    measurementId: "G-DRMGW33GYM"
};
// Initialize Firebase
const application = firebase.initializeApp(firebaseConfig);
const database = application.firestore();

export { database };