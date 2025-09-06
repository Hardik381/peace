// ------------------------------
// Import Firebase SDKs
// ------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// ------------------------------
// Firebase Configuration
// ------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyC4FRFnWWdVK6VucPG95LGbAzJJvhM1C7E",
  authDomain: "peace-e7ab5.firebaseapp.com",
  projectId: "peace-e7ab5",
  storageBucket: "peace-e7ab5.appspot.com",
  messagingSenderId: "447627728618",
  appId: "1:447627728618:web:e29427f2956b4e52db6993"
};

// ------------------------------
// Initialize Firebase App
// ------------------------------
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ------------------------------
// SIGN UP FUNCTIONALITY
// ------------------------------
const signUp = document.getElementById("signup-submit");

signUp.addEventListener("click", (event) => {
  event.preventDefault();

  const firstName = document.getElementById("signup-firstname").value;
  const lastName = document.getElementById("signup-lastname").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      const userData = {
        email,
        firstName,
        lastName,
      };

      console.log("User signed up:", user.email);

      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          window.location.href = "index.html";
        })
        .catch((error) => {
          console.error("Error writing document", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        alert("The email already exists");
      } else {
        alert("Unable to create user: " + error.message);
      }
    });
});

// ------------------------------
// LOGIN FUNCTIONALITY
// ------------------------------
const logIn = document.getElementById("login-submit");

logIn.addEventListener("click", (event) => {
  event.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("You are successfully signed in!");
      const user = userCredential.user;

      localStorage.setItem("loggedInUserId", user.uid);

      window.location.href = "../homepage/homepage.html";
    })
    .catch((error) => {
      const errorCode = error.code;

      if (errorCode === "auth/invalid-credential" || errorCode === "auth/wrong-password") {
        alert("Incorrect email or password");
      } else if (errorCode === "auth/user-not-found") {
        alert("Account does not exist");
      } else {
        alert("Login failed: " + error.message);
      }
    });
});

// ------------------------------
// GOOGLE SIGN-IN FUNCTIONALITY
// ------------------------------
const googleBtn = document.getElementById("google-signin");
const provider = new GoogleAuthProvider();

if (googleBtn) {
  googleBtn.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        console.log("Google User:", user);

        // Save user to Firestore if not already exists
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          const userData = {
            email: user.email,
            firstName: user.displayName?.split(" ")[0] || "",
            lastName: user.displayName?.split(" ")[1] || "",
            photoURL: user.photoURL,
          };
          await setDoc(docRef, userData);
        }

        // Store user id in localStorage
        localStorage.setItem("loggedInUserId", user.uid);

        // Redirect
        window.location.href = "../homepage/homepage.html";
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error);
        alert("Google Sign-In failed: " + error.message);
      });
  });
}
