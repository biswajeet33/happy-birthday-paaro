const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const downloadLink = document.getElementById("downloadLink");

let fxCanvas, texture;
let currentFilter = null;

// List of filters (20+ with args)
const filters = [
  { name: "None", fn: (c) => c },
  { name: "Sepia", fn: (c) => c.sepia(1) },
  { name: "Vignette", fn: (c) => c.vignette(0.5, 0.6) },
  { name: "Hue", fn: (c) => c.hueSaturation(0.8, 0.5) },
  { name: "Vintage", fn: (c) => c.sepia(0.7).vignette(0.4, 0.5) },
  { name: "Glow", fn: (c) => c.bulgePinch(0.5, 0.5, 0.3, 0.1).vibrance(0.6) },
  { name: "Soft Pink", fn: (c) => c.brightnessContrast(0.1, 0.3).vignette(0.3, 0.6) },
  { name: "Cyberpunk", fn: (c) => c.hueSaturation(2, 1).triangleBlur(5) },
  { name: "Twist", fn: (c) => c.swirl(0.5, 0.5, 0.5, 3) },
  { name: "Dreamy", fn: (c) => c.triangleBlur(8).vibrance(0.3) },
  { name: "Romance", fn: (c) => c.brightnessContrast(0.15, 0.5).sepia(0.2) },
  { name: "Blush", fn: (c) => c.vibrance(0.9) },
  { name: "Glow + Sepia", fn: (c) => c.bulgePinch(0.5, 0.5, 0.5, 0.05).sepia(0.3) },
  { name: "Bubble", fn: (c) => c.bulgePinch(0.3, 0.3, 0.5, 0.3) },
  { name: "BW Retro", fn: (c) => c.hueSaturation(0, -1) },
  { name: "Deep Love", fn: (c) => c.vignette(0.8, 0.8).brightnessContrast(0.2, 0.7) },
  { name: "Pastel Mood", fn: (c) => c.hueSaturation(-0.5, 0.3) },
  { name: "Twilight", fn: (c) => c.brightnessContrast(0, 0.6).hueSaturation(1.2, 0.1) },
  { name: "Anime Glow", fn: (c) => c.triangleBlur(2).brightnessContrast(0.1, 0.3) },
  { name: "Lips & Lashes", fn: (c) => c.vibrance(1).sepia(0.1) }
];

navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  video.srcObject = stream;

  video.addEventListener("play", () => {
    fxCanvas = fx.canvas();
    canvas.parentNode.replaceChild(fxCanvas, canvas);

    setInterval(() => {
      if (!fxCanvas) return;

      if (!texture) {
        texture = fxCanvas.texture(video);
      } else {
        texture.loadContentsOf(video);
      }

      let draw = fxCanvas.draw(texture);
      if (currentFilter) {
        draw = currentFilter(draw);
      }
      draw.update();
    }, 50);
  });
}).catch(err => {
  alert("Camera access denied or unavailable.");
});

function takeSnapshot() {
  const imgData = fxCanvas.toDataURL("image/png");
  downloadLink.href = imgData;
}

function createFilterButtons() {
  const container = document.getElementById("filterList");
  filters.forEach((filter, index) => {
    const btn = document.createElement("button");
    btn.textContent = filter.name;
    btn.onclick = () => {
      currentFilter = filter.fn;
    };
    btn.className = "filter-btn";
    container.appendChild(btn);
  });
}

createFilterButtons();
