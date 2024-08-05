// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWzRrVkyTzgwjbcAKO9-YzogAjnZstgd0",
  authDomain: "inventory-management-app-618d5.firebaseapp.com",
  projectId: "inventory-management-app-618d5",
  storageBucket: "inventory-management-app-618d5.appspot.com",
  messagingSenderId: "307774476009",
  appId: "1:307774476009:web:842b96032947ea56222a78",
  measurementId: "G-KV0GZZWJ5B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app)

export {firestore}