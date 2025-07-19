let userInfo = {};

function login() {
  const contact = document.getElementById("contact").value.trim();
  const username = document.getElementById("username").value.trim();

  if (!contact || !username) {
    alert("Please enter both your contact and username.");
    return;
  }

  userInfo = { contact, username };
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

  const historyItem = document.createElement("li");
  historyItem.innerHTML = `
    <strong>${userInfo.username}</strong> — <em>${timestamp}</em><br>
    Mood: ${userInfo.mood}
    ${comment ? `<br>Comment: ${comment}` : ""}
    ${needHelp ? `<div class="help-box">Needs someone to check in.</div>` : ""}
  `;

  document.getElementById("history").prepend(historyItem);

  document.getElementById("comment").value = "";
  document.getElementById("needHelp").checked = false;
  document.getElementById("moodForm").style.display = "none";
}

function goToOverview() {
  alert("This would take you to the mood overview page (to be implemented or faked for now).");
}
