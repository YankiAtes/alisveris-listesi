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
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();

//Current date assignation
let dateInput = document.getElementById("dateInput");
let today = new Date();
let year = today.getFullYear();
let month = String(today.getMonth() + 1).padStart(2, "0"); // Ayı iki basamaklı yap
let day = String(today.getDate()).padStart(2, "0"); // Günü iki basamaklı yap
let dateStr = `${year}-${month}-${day}`;
dateInput.value = localStorage.getItem("selectedDate");
console.log(localStorage.getItem("selectedDate"), "localStorage");
if (localStorage.getItem("todaysDate") != dateStr) {
  localStorage.setItem("todaysDate", dateStr);
  localStorage.setItem("selectedDate", dateStr);
}
if (dateInput.value != localStorage.getItem("selectedDate")) {
  localStorage.setItem("selectedDate", dateStr);
  dateInput.value = localStorage.getItem("selectedDate");
}

//Selected date assignation
dateInput.addEventListener("change", () => {
  localStorage.setItem("selectedDate", dateInput.value);
  console.log(localStorage.getItem("selectedDate"));
  document.getElementById("grocery").submit();
});
//
//
//
//
//
let grocery = document.getElementById("grocery");
grocery.addEventListener("submit", addItem);

//Import items
let collectionReference = collection(db, localStorage.getItem("selectedDate"));
let docsSnap = await getDocs(collectionReference);
docsSnap.forEach((doc) => {
  console.log(doc.data().text);

  let list = document.querySelector("ol");
  let item = document.createElement("li");
  let text = document.createElement("p");

  text.textContent = doc.data().text;
  item.append(text);
  list.append(item);

  let removeButton = document.createElement("span");
  removeButton.setAttribute("id", doc.data().text);
  removeButton.classList.add("remove");
  item.append(removeButton);
  removeButton.addEventListener("click", deleteItem);
});

//Add item with button
function addItem(e) {
  e.preventDefault();
  let data = this.elements.writeList.value;
  let list = document.querySelector("ol");
  let item = document.createElement("li");
  let text = document.createElement("p");

  text.textContent = data;
  this.elements.writeList.value = "";
  item.append(text);
  list.append(item);

  async function AddDocument_CustomID() {
    let ref = doc(db, localStorage.getItem("selectedDate"), data);

    await setDoc(ref, {
      text: data,
    }).catch((error) => {
      alert("Unsuccesful operation, error:", error);
    });
  }
  AddDocument_CustomID();

  let removeButton = document.createElement("span");
  removeButton.setAttribute("id", data);
  removeButton.classList.add("remove");
  item.append(removeButton);
  removeButton.addEventListener("click", deleteItem);
}

//Remove item with remove button
function deleteItem() {
  let elementId = this.id;
  async function DeleteDocument() {
    let ref = doc(db, localStorage.getItem("selectedDate"), elementId);
    const docSnap = await getDoc(ref);
    if (!docSnap.exists()) {
      alert("Error No:1");
      return;
    }

    await deleteDoc(ref).catch((error) => {
      alert("Unsuccesful operation, error:", error);
    });
  }
  DeleteDocument();
  this.parentElement.remove();
}
