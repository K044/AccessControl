// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYc87fc9JCCY27dbGxYz0wfLNEUxxmx0Q",
  authDomain: "accesscontrol-1802c.firebaseapp.com",
  projectId: "accesscontrol-1802c",
  storageBucket: "accesscontrol-1802c.appspot.com",
  messagingSenderId: "1071945370796",
  appId: "1:1071945370796:web:6c65b880a574fa92e3a309"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);