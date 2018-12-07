import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDS4U4WExDu4WXI8cu60Wg5Qz9gnU69cK4",
    authDomain: "personal-trainer-4b0a3.firebaseapp.com",
    databaseURL: "https://personal-trainer-4b0a3.firebaseio.com",
    projectId: "personal-trainer-4b0a3",
    storageBucket: "personal-trainer-4b0a3.appspot.com",
    messagingSenderId: "261545588156"
  };
  const fire = firebase.initializeApp(config);
  export default fire;