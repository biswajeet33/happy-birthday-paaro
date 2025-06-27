function saveNote() {
  const input = document.getElementById("noteInput");
  const text = input.value.trim();

  if (text === "") {
    alert("Write something sweet first 💌");
    return;
  }

  const notes = JSON.parse(localStorage.getItem("loveNotes") || "[]");
  notes.unshift({ text, time: new Date().toLocaleString() });
  localStorage.setItem("loveNotes", JSON.stringify(notes));

  input.value = "";
  loadNotes();
}

function loadNotes() {
  const list = document.getElementById("noteList");
  list.innerHTML = "";

  const notes = JSON.parse(localStorage.getItem("loveNotes") || "[]");
  notes.forEach(note => {
    const div = document.createElement("div");
    div.className = "note-card";
    div.innerHTML = `
      <div>${note.text}</div>
      <div style="font-size: 12px; color: #999; text-align: right;">🕒 ${note.time}</div>
    `;
    list.appendChild(div);
  });
}

function clearNotes() {
  if (confirm("Are you sure you want to delete all notes? 💔")) {
    localStorage.removeItem("loveNotes");
    loadNotes();
   let mediaRecorder;
let audioChunks = [];

function startRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    audioChunks = [];

    mediaRecorder.ondataavailable = event => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      const reader = new FileReader();

      reader.onloadend = function () {
        const base64Audio = reader.result;
        const audioNotes = JSON.parse(localStorage.getItem("audioNotes") || "[]");
        audioNotes.unshift({
          data: base64Audio,
          time: new Date().toLocaleString()
        });
        localStorage.setItem("audioNotes", JSON.stringify(audioNotes));
        loadAudioNotes();
      };

      reader.readAsDataURL(audioBlob); // Convert blob to base64
    };

    alert("🎙️ Recording started...");
  }).catch(err => {
    alert("Microphone permission denied or unavailable.");
    console.error(err);
  });
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    alert("⏹️ Recording stopped!");
  }
}

function loadAudioNotes() {
  const list = document.getElementById("audioNoteList");
  list.innerHTML = "";

  const audioNotes = JSON.parse(localStorage.getItem("audioNotes") || "[]");

  audioNotes.forEach(note => {
    const div = document.createElement("div");
    div.className = "note-card";
    div.innerHTML = `
      <div>🎧 Voice Note from ${note.time}</div>
      <audio controls src="${note.data}"></audio>
    `;
    list.appendChild(div);
  });
}

  }
}

window.onload = loadNotes;
