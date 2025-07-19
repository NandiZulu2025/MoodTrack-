let userInfo = {};
const allMoods = [];

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

  const moodEntry = {
    username: userInfo.username,
    contact: userInfo.contact,
    mood: userInfo.mood,
    comment,
    needHelp,
    timestamp,
  };

  allMoods.push(moodEntry);

  const historyItem = document.createElement("li");
  historyItem.innerHTML = `
    <strong>${moodEntry.mood}</strong> — ${moodEntry.timestamp}
    ${comment ? `<br>Comment: ${comment}` : ""}
    ${needHelp ? `<div class="help-box">Needs someone to check in.</div>` : ""}
  `;
  document.getElementById("history").prepend(historyItem);

  // Reset form
  document.getElementById("comment").value = "";
  document.getElementById("needHelp").checked = false;
  document.getElementById("moodForm").style.display = "none";
}

function goToOverview() {
  document.getElementById("mainApp").style.display = "none";
  document.getElementById("overviewScreen").style.display = "block";

  const list = document.getElementById("overviewList");
  list.innerHTML = "";

  allMoods.forEach((entry, index) => {
    const li = document.createElement("li");
    li.className = "overview-entry";
    li.innerHTML = `
      <strong>${entry.username}</strong> — ${entry.mood} <span style="font-size: 0.85em;">(${entry.timestamp})</span>
      <div class="overview-details" id="details-${index}">
        ${entry.comment ? `<p><strong>Comment:</strong> ${entry.comment}</p>` : ""}
        ${entry.needHelp ? `<p class="help-box">Needs someone to check in</p>` : ""}
        <p><strong>Contact:</strong> ${entry.contact}</p>
      </div>
    `;

    li.addEventListener("click", () => {
      const detailBox = document.getElementById(`details-${index}`);
      detailBox.style.display = detailBox.style.display === "block" ? "none" : "block";
    });

    list.appendChild(li);
  });
}

function backToMain() {
  document.getElementById("overviewScreen").style.display = "none";
  document.getElementById("mainApp").style.display = "block";
}
