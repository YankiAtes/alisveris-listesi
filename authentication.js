// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHmrsv_dUf7EoypSDZtGp9WsjWRVK4pXQ",
  authDomain: "alisveris-listesi-3b448.firebaseapp.com",
  projectId: "alisveris-listesi-3b448",
  storageBucket: "alisveris-listesi-3b448.appspot.com",
  messagingSenderId: "88875285131",
  appId: "1:88875285131:web:80aef906fad7b63509328e",
  measurementId: "G-MPHE5C4PT4",
};
console.log("User signed in: ", user);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      //Signed in user info
      const user = result.user;
      console.log("User signed in: ", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      //The email of user
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("Error signing in with Google: ", errorCode, errorMessage);
    });
};

const signOutUser = () => {
  signOut(auth)
    .then(() => {
      console.log("User Signed Out");
    })
    .catch((error) => {
      console.log("Error signing out: ", error);
    });
};

document
  .getElementById("signInWithGoogleBtn")
  .addEventListener("click", signInWithGoogle);

document.getElementById("signOutBtn").addEventListener("click", signOutUser);

onAuthStateChanged(auth, (user) => {
  if (user) {
    //User is signed in
    log("User is signed in: ", user);
  } else {
    //User is signed out
    console.log("User signed out");
  }
});
