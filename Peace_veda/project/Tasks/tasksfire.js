
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  updateDoc, 
  arrayUnion, 
  getDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔹 Your Firebase config (make sure these are your actual values!)
const firebaseConfig = {
  apiKey: "AIzaSyC4FRFnWWdVK6VucPG95LGbAzJJvhM1C7E",
  authDomain: "peace-e7ab5.firebaseapp.com",
  projectId: "peace-e7ab5",
  storageBucket: "peace-e7ab5.appspot.com",
  messagingSenderId: "447627728618",
  appId: "1:447627728618:web:e29427f2956b4e52db6993"
};

// 🔹 Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let pointsArray = [];

/**
 * Mark a task as done and update Firestore
 * @param {HTMLElement} button - The clicked button
 * @param {number} points - The points for this task
 * @param {string} day - The day name (e.g., "Monday")
 */
async function markDone(button, points, day) {
  let li = button.parentElement;

  if (!li.classList.contains("done")) {
    li.classList.add("done");
    button.disabled = true;

    pointsArray.push(points);

    console.log("👉 Adding points:", points, "for", day);

    const dayRef = doc(db, "dailyPoints", day);

    try {
      // Check if document exists
      const docSnap = await getDoc(dayRef);

      if (docSnap.exists()) {
        const currentData = docSnap.data();
        const currentTotal = currentData.totalScore || 0;

        await updateDoc(dayRef, {
          points: arrayUnion(points),
          totalScore: currentTotal + points
        });

        console.log(`✅ Updated ${day}: +${points}, New Total = ${currentTotal + points}`);
      } else {
        await setDoc(dayRef, {
          points: [points],
          totalScore: points
        });

        console.log(`✅ Created new doc for ${day} with Total = ${points}`);
      }
    } catch (err) {
      console.error("🔥 Firestore error:", err);
    }
  }
}

// Make markDone available for inline HTML
window.markDone = markDone;
