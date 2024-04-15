import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// console.log(process.env.REACT_APP_API_KEY);
const firebaseConfig = {
  apiKey: "AIzaSyBI9koczoAYRN-brYM8WNwpmXYBdxsFKIs",
  authDomain: "codepencilbox.firebaseapp.com",
  projectId: "codepencilbox",
  storageBucket: "codepencilbox.appspot.com",
  messagingSenderId: "509302448896",
  appId: "1:509302448896:web:8cd0e87e13033382d789e5",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const imageDb = getStorage(app);

export { app, auth, db, imageDb };


// Its amazing that nothing is discovered by doing things right