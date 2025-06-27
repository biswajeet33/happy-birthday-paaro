const videoElement = document.getElementById('input_video');
const canvasElement = document.getElementById('output_canvas');
const canvasCtx = canvasElement.getContext('2d');

function drawHearts(x, y) {
  canvasCtx.font = "24px serif";
  canvasCtx.fillText("💖", x - 10, y - 20);
}

function drawBlush(x, y) {
  canvasCtx.beginPath();
  canvasCtx.arc(x, y, 10, 0, 2 * Math.PI);
  canvasCtx.fillStyle = 'rgba(255,105,180,0.4)';
  canvasCtx.fill();
}

const faceMesh = new FaceMesh({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
});

faceMesh.setOptions({
  maxNumFaces: 1,
  refineLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

faceMesh.onResults(results => {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  if (results.multiFaceLandmarks.length > 0) {
    const face = results.multiFaceLandmarks[0];

    const leftCheek = face[234];  // x,y near left cheek
    const rightCheek = face[454]; // x,y near right cheek
    const forehead = face[10];    // near forehead

    drawBlush(leftCheek.x * canvasElement.width, leftCheek.y * canvasElement.height);
    drawBlush(rightCheek.x * canvasElement.width, rightCheek.y * canvasElement.height);
    drawHearts(forehead.x * canvasElement.width, forehead.y * canvasElement.height);
  }

  canvasCtx.restore();
});

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await faceMesh.send({ image: videoElement });
  },
  width: 640,
  height: 480
});
camera.start();

canvasElement.width = 640;
canvasElement.height = 480;
