// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCwe5ULEeMj1O4mqWx7xQ3GuT11X8j4ge4",
  authDomain: "mysmartschool-2233a.firebaseapp.com",
  projectId: "mysmartschool-2233a",
  storageBucket: "mysmartschool-2233a.firebasestorage.app",
  messagingSenderId: "184414197101",
  appId: "1:184414197101:web:4ce50774955eafd77d7664"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };