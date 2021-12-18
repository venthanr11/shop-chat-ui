import firebase from 'firebase/compat/app';
import 'firebase/compat/database'

const firebaseConfig = {
    apiKey: "AIzaSyAru7MN61NjxdI1t5MAvKdDer1LziJwENY",
    authDomain: "shopchat-7df10.firebaseapp.com",
    projectId: "shopchat-7df10",
    storageBucket: "shopchat-7df10.appspot.com",
    messagingSenderId: "423170830679",
    appId: "1:423170830679:web:7eefbacbcec814a5e90e12",
    databaseURL: "https://shopchat-7df10-default-rtdb.asia-southeast1.firebasedatabase.app"
  };

const app = firebase.initializeApp(firebaseConfig)

const firebaseDatabase = firebase.database()

export {
    app,
    firebaseDatabase
};