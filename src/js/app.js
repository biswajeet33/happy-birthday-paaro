document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim().toLowerCase();
  const password = document.getElementById('password').value;

  // Basic role check (replace with backend later)
  const users = {
    admin: "adminpass",
    chinky: "loveyou"
  };

  if (users[username] && users[username] === password) {
    localStorage.setItem("user", username);

    // Redirect based on role
    if (username === "admin") {
      window.location.href = "home.html";
    } else {
      window.location.href = "journal.html";
    }
  } else {
    alert("Invalid username or password 💔");
  }
});
