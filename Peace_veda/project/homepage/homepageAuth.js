// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4FRFnWWdVK6VucPG95LGbAzJJvhM1C7E",
  authDomain: "peace-e7ab5.firebaseapp.com",
  projectId: "peace-e7ab5",
  storageBucket: "peace-e7ab5.appspot.com", 
  messagingSenderId: "447627728618",
  appId: "1:447627728618:web:e29427f2956b4e52db6993"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Check authentication state
onAuthStateChanged(auth, (user) => {
  const loggedInUserId = localStorage.getItem("loggedInUserId");
  console.log("LoggedInUserId from localStorage:", loggedInUserId);

  if (loggedInUserId) {
    const docRef = doc(db, "users", loggedInUserId);

    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
        //   document.getElementsByClassName("no-wrap")[0].innerText =
        //     userData.firstName.toUpperCase();
        } else {
          console.log("No document found matching ID:", loggedInUserId);
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
        alert("Error getting document: " + error.message);
      });
  } else {
    console.log("User ID not found in local storage");
  }
});

// Logout button
const logOutButton = document.getElementById("logout");
logOutButton.addEventListener("click", () => {
  localStorage.removeItem("loggedInUserId");
  signOut(auth)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
});
