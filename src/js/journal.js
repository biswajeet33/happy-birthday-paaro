function saveEntry() {
  const text = document.getElementById("entry").value.trim();
  if (text === "") {
    alert("Please write something first 💌");
    return;
  }

  const date = new Date().toLocaleString();
  const entry = { date, text };
  const journal = JSON.parse(localStorage.getItem("journal")) || [];
  journal.push(entry);
  localStorage.setItem("journal", JSON.stringify(journal));

  document.getElementById("entry").value = "";
  document.getElementById("status").textContent = "Entry saved 💖";
}

function clearEntry() {
  document.getElementById("entry").value = "";
  document.getElementById("status").textContent = "";
}
