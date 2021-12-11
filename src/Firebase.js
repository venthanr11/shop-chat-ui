import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAru7MN61NjxdI1t5MAvKdDer1LziJwENY",
    authDomain: "shopchat-7df10.firebaseapp.com",
    projectId: "shopchat-7df10",
    storageBucket: "shopchat-7df10.appspot.com",
    messagingSenderId: "423170830679",
    appId: "1:423170830679:web:7eefbacbcec814a5e90e12",
    measurementId: "${config.measurementId}"
  };

const app = initializeApp(firebaseConfig);

const firebaseDatabase = getDatabase(app)

export {
    app,
    firebaseDatabase
};