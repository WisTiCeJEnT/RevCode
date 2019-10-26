import firebase from "firebase/app";

require("firebase/auth");


const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
  };

  
const Firebase=firebase.initializeApp(config);
  

  export default Firebase