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
const db = getFirestore();

let inputField = document.getElementById("writeList");
let dropdown = document.getElementById("dropdown");
let options = [];

let collectionReference = collection(db, "items");
let docsSnap = await getDocs(collectionReference);
docsSnap.forEach((doc) => {
  //console.log(doc.data().text);
  options.push(doc.data().text);
});
console.log(options);
inputField.addEventListener("focus", () => {
  filterDropdown();
  dropdown.style.display = "block";
});

inputField.addEventListener("input", () => {
  filterDropdown();
});

inputField.addEventListener("blur", () => {
  setTimeout(() => {
    dropdown.style.display = "none";
  }, 200);
});

function filterDropdown() {
  let query = inputField.value.toLowerCase();
  let filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(query)
  );
  populateDropdown(filteredOptions);
}

function populateDropdown(items) {
  dropdown.innerHTML = "";
  items.forEach((item) => {
    let optionDiv = document.createElement("div");
    optionDiv.className = "dropdown-option";
    optionDiv.textContent = item;
    optionDiv.addEventListener("click", () => {
      handleOptionSelect(item);
      inputField.value = item;
      dropdown.style.display = "none";
    });
    dropdown.appendChild(optionDiv);
  });
}

function handleOptionSelect(selectedItem) {
  console.log("Selected Item: ", selectedItem);
  function addItem() {
    let data = selectedItem;
    let list = document.querySelector("ol");
    let item = document.createElement("li");
    let text = document.createElement("p");
    text.textContent = data;
    item.append(text);
    list.append(item);
    //add document to date specific collection
    async function AddDocumentDateSpecific() {
      let ref = doc(db, localStorage.getItem("selectedDate"), data);

      await setDoc(ref, {
        text: data,
      }).catch((error) => {
        alert("Unsuccesful operation, error:", error);
      });
    }
    AddDocumentDateSpecific();
    let removeButton = document.createElement("span");
    removeButton.setAttribute("id", data);
    removeButton.classList.add("remove");
    item.append(removeButton);
    removeButton.addEventListener("click", deleteItem);

    if (localStorage.getItem("userProfilePicture")) {
      let adderProfilePhoto = document.createElement("img");
      adderProfilePhoto.setAttribute(
        "src",
        localStorage.getItem("userProfilePicture")
      );
      adderProfilePhoto.classList.add("adderProfilePhoto");
      item.append(adderProfilePhoto);
    }

    document.getElementById("grocery").submit(preventDefault());
  }

  addItem();
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
