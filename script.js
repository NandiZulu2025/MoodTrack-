let userInfo = {};
let userMoodHistory = []; // store all moods saved for demo overview

function login() {
  const contact = document.getElementById("contact").value.trim();
  const username = document.getElementById("username").value.trim();

  if (contact === "" || username === "") {
    alert("Please enter both your contact and username.");
    return;
  }

  userInfo = {
    contact,
    username
  };

  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("mainApp").style.display = "block";
  document.getElementById("welcomeMessage").textContent = `Welcome, ${username}!`;
}

function selectMood(mood) {
  userInfo.mood = mood;
  document.getElementById("moodForm").style.display = "block";
}

function saveMood() {
  const comment = document.getElementById("comment").value.trim();
  const needHelp = document.getElementById("needHelp").checked;
  const timestamp = new Date().toLocaleString();

  // Save this mood with user info in history array
  userMoodHistory.unshift({
    username: userInfo.username,
    mood: userInfo.mood,
    timestamp,
    comment,
    needHelp
  });

  // Also add to visible personal history list
  const historyItem = document.createElement("li");
  let content = `<strong>${userInfo.mood}</strong> — ${timestamp}`;
  if (comment) content += `<br>Comment: ${comment}`;
  if (needHelp) content += `<div class="help-box">Needs someone to check in.</div>`;
  historyItem.innerHTML = content;
  document.getElementById("history").prepend(historyItem);

  // Clear form and hide
  document.getElementById("comment").value = "";
  document.getElementById("needHelp").checked = false;
  document.getElementById("moodForm").style.display = "none";
}

// Show overview screen
function showOverview() {
  document.getElementById("mainApp").style.display = "none";
  document.getElementById("overviewScreen").style.display = "block";

  // Fill table
  const tbody = document.querySelector("#overviewTable tbody");
  tbody.innerHTML = ""; // clear previous

  // For demo, add a few static entries + current userMoodHistory
  const demoData = [
    { username: "Alice", mood: "😄 Excited", timestamp: "2025-07-18 10:00 AM" },
    { username: "Bob", mood: "😔 Sad", timestamp: "2025-07-18 11:15 AM" },
    { username: "Charlie", mood: "❤️ In Love", timestamp: "2025-07-18 12:30 PM" },
  ];

  const allData = [...userMoodHistory, ...demoData];

  allData.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${entry.username}</td><td>${entry.mood}</td><td>${entry.timestamp}</td>`;
    tbody.appendChild(row);
  });
}

// Back to main mood screen
function backToMain() {
  document.getElementById("overviewScreen").style.display = "none";
  document.getElementById("mainApp").style.display = "block";
}

