let selectedMood = "";

function selectMood(mood) {
  selectedMood = mood;
  document.getElementById("moodForm").style.display = "block";
}

function saveMood() {
  const today = new Date().toLocaleDateString();
  const comment = document.getElementById("comment").value.trim();
  const needHelp = document.getElementById("needHelp").checked;

  const entry = {
    date: today,
    mood: selectedMood,
    comment: comment,
    needHelp: needHelp
  };

  let history = JSON.parse(localStorage.getItem("moodHistory")) || [];
  history.unshift(entry);
  localStorage.setItem("moodHistory", JSON.stringify(history));

  // Reset form
  document.getElementById("comment").value = "";
  document.getElementById("needHelp").checked = false;
  document.getElementById("moodForm").style.display = "none";

  showHistory();
}

function showHistory() {
  const list = document.getElementById("history");
  list.innerHTML = "";
  const history = JSON.parse(localStorage.getItem("moodHistory")) || [];

  history
    .filter(item => item && item.date && item.mood)
    .forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${item.date}:</strong> ${item.mood}<br />
        ${item.comment ? `<em>“${item.comment}”</em><br />` : ""}
        ${item.needHelp ? `<span class="helpNeeded">⚠️ Needs someone to check in.</span>` : ""}`;
      list.appendChild(li);
    });
}

function init() {
  const username = localStorage.getItem("username");
  const phoneEmail = localStorage.getItem("phoneEmail");

  if (username && phoneEmail) {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("appScreen").style.display = "block";
    document.getElementById("welcomeMessage").textContent = `Welcome, ${username}`;
    showHistory();
  }
}

// Login button handler
document.getElementById("loginBtn").addEventListener("click", () => {
  const usernameInput = document.getElementById("username").value.trim();
  const phoneEmailInput = document.getElementById("phoneEmail").value.trim();

  if (!usernameInput || !phoneEmailInput) {
    alert("Please enter both username and email or phone number.");
    return;
  }

  localStorage.setItem("username", usernameInput);
  localStorage.setItem("phoneEmail", phoneEmailInput);

  // Show app screen, hide login screen
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("appScreen").style.display = "block";

  document.getElementById("welcomeMessage").textContent = `Welcome, ${usernameInput}`;
  showHistory();
});

// Initialize app on load
init();
