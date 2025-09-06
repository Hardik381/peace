    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
    import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

    // 🔹 Firebase Config
    const firebaseConfig = {
  apiKey: "AIzaSyC4FRFnWWdVK6VucPG95LGbAzJJvhM1C7E",
  authDomain: "peace-e7ab5.firebaseapp.com",
  projectId: "peace-e7ab5",
  storageBucket: "peace-e7ab5.appspot.com",
  messagingSenderId: "447627728618",
  appId: "1:447627728618:web:e29427f2956b4e52db6993"
};

    // Init Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

    // Chart instance (created empty first)
    const ctx = document.getElementById("myChart").getContext("2d");
    const progressChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: days,
        datasets: [{
          label: "Weekly Points",
          data: Array(7).fill(0), // placeholder zeros
          borderColor: "#2d6a4f",
          backgroundColor: "rgba(45, 106, 79, 0.2)",
          borderWidth: 2,
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true }},
        scales: { y: { beginAtZero: true }}
      }
    });

    // 🔹 Listen to all days in real-time
    days.forEach((day, index) => {
      const dayRef = doc(db, "dailyPoints", day);

      onSnapshot(dayRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          progressChart.data.datasets[0].data[index] = data.totalScore || 0;
        } else {
          progressChart.data.datasets[0].data[index] = 0;
        }
        progressChart.update();
      });
    });

    // Add current date
    document.getElementById("reportDate").textContent = new Date().toLocaleDateString();