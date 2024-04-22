prompt("Welcome to DigiSign");

const txtColorPicker = document.getElementById("txtColorPicker");
const bgColorPicker = document.getElementById("bgColorPicker");
const signCanvas = document.getElementById("signCanvas");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const retrieveButton = document.getElementById("retrieveButton");
const fontSize = document.getElementById("fontSize");

const ctx = signCanvas.getContext("2d");

let isDrawing = false; // Declare isDrawing variable
let lastX = 0; // Declare lastX variable
let lastY = 0; // Declare lastY variable

txtColorPicker.addEventListener("change", (e) => {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
});

signCanvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  lastX = event.offsetX;
  lastY = event.offsetY;
});

signCanvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();

    lastX = event.offsetX;
    lastY = event.offsetY;
  }
});

signCanvas.addEventListener("mouseup", (e) => {
  isDrawing = false;
});

bgColorPicker.addEventListener("change", (e) => {
  ctx.fillStyle = e.target.value;
  ctx.fillRect(0, 0, 800, 500);
});

fontSize.addEventListener("change", (e) => {
  ctx.lineWidth = e.target.value;
});

clearButton.addEventListener("click", (e) => {
  ctx.clearRect(0, 0, signCanvas.width, signCanvas.height);
});

saveButton.addEventListener("click", (e) => {
  localStorage.setItem("canvasContents", signCanvas.toDataURL());
  let link = document.createElement("a");
  link.download = "my-sign.png";
  link.href = signCanvas.toDataURL();
  link.click();
});

retrieveButton.addEventListener("click", () => {
  let savedCanvas = localStorage.getItem("canvasContents");

  if (savedCanvas) {
    let img = new Image();
    img.src = savedCanvas;
    ctx.drawImage(img, 0, 0);
  }
});
