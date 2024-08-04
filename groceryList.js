// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
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
  measurementId: "G-MPHE5C4PT4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


let grocery = document.getElementById("grocery");
grocery.addEventListener("submit", addItem)

function addItem(e){
    e.preventDefault();
    let data = this.elements.writeList.value;
    let list = document.querySelector("ol");
    let item = document.createElement("li");
    let text = document.createElement("p")

    text.textContent = data;
    this.elements.writeList.value = "";
    item.append(text);
    list.append(item);

    let removeButton = document.createElement("span");
    removeButton.classList.add("remove");
    item.append(removeButton);
    removeButton.addEventListener("click", deleteItem);
}

function deleteItem(e){
    this.parentElement.remove();
}


