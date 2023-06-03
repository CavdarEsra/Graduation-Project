const video = document.getElementById("video");
let faceMatcher;
let welcomePopup = null;

Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
]).then(startWebcam).then(faceRecognition);

function startWebcam() {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((error) => {
      console.error(error);
    });
}
function showUnknownPopup() {
  if (welcomePopup) {
    welcomePopup.remove();
  }

  const popup = document.createElement("div");
  popup.className = "welcome-popup";
  popup.textContent = "Kayıtlı değilsiniz";
  document.body.appendChild(popup);

  welcomePopup = popup;

  setTimeout(() => {
    window.location.href = "signup.html";
  }, 3000);
}
function showWelcomePopup(label) {
  if (welcomePopup) {
    welcomePopup.remove();
  }

  const popup = document.createElement("div");
  popup.className = "welcome-popup";
  popup.textContent = "Hoşgeldin, " + label;
  document.body.appendChild(popup);

  welcomePopup = popup;

  setTimeout(() => {
    window.location.href = "index.html";
  }, 3000);
}

function getLabeledFaceDescriptions() {
  const labels = ["Bill Gates", "Jeff Bezos", "Linus Torvalds"];
  return Promise.all(
    labels.map(async (label) => {
      const descriptions = [];
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(`./labels/${label}/${i}.jpg`);
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();

        descriptions.push(detections.descriptor);
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
}

async function faceRecognition() {
  const labeledFaceDescriptors = await getLabeledFaceDescriptions();
  faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);
}

video.addEventListener("play", async () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);

  const displaySize = { width: video.videoWidth, height: video.videoHeight };
  faceapi.matchDimensions(canvas, displaySize);

  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video)
      .withFaceLandmarks()
      .withFaceDescriptors();

    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    const results = resizedDetections.map((d) => {
      return faceMatcher.findBestMatch(d.descriptor);
    });
    results.forEach((result, i) => {
      const box = resizedDetections[i].detection.box;
      const drawBox = new faceapi.draw.DrawBox(box, { label: result.label });
      drawBox.draw(canvas);

      if (result.label === "unknown") {
        showUnknownPopup();
      } else if (result.distance < 0.5) {
        showWelcomePopup(result.label);
      } else {
        if (welcomePopup) {
          welcomePopup.remove();
          welcomePopup = null;
        }
      }
    });
  }, 100);
});



