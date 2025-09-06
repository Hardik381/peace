 let totalScore = 0;

    function markDone(button, points) {
      let li = button.parentElement;
      if (!li.classList.contains("done")) {
        li.classList.add("done");
        button.disabled = true;
        totalScore += points;
        document.getElementById("totalScore").innerText = totalScore;
        updateProgress();
      }
    }

    function updateProgress() {
      let progress = (totalScore / 350) * 100; // 350 max (example)
      document.getElementById("progress").style.width = progress + "%";
    }

    function toggleDay(header) {
      let content = header.nextElementSibling;
      content.style.display = (content.style.display === "block") ? "none" : "block";
    }
