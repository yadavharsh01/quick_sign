const textColor = document.getElementById("textColor");
const canvasColor = document.getElementById("canvasColor");
const fontPicker = document.getElementById("fontPicker");
const canvas = document.getElementById("myCanvas");
const clearButoon = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const retrieveButton = document.getElementById("retrieveButton");

const ctx = canvas.getContext("2d");

textColor.addEventListener("change", (e) => {
  ctx.stroxeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
});

canvas.addEventListener("mousedown", (e) => {
  isDwawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});
canvas.addEventListener("mousemove", (e) => {
  if (isDwawing) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
  }
});
canvas.addEventListener("mouseup", () => {
  isDwawing = false;
});

canvasColor.addEventListener("change", (e) => {
  ctx.fillStyle = e.target.value;
  ctx.fillRect(0, 0, 800, 500);
});
fontPicker.addEventListener("change", (e) => {
  ctx.lineWidth = e.target.value;
});

clearButoon.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
saveButton.addEventListener("click", () => {
  localStorage.setItem("canvasContents", canvas.toDataURL());
  let link = document.createElement("a");
  link.download = "my-canvas.png";
  link.href = canvas.toDataURL();
  link.click();
});
retrieveButton.addEventListener("click", () => {
  let savedCanvas = localStorage.getItem("canvasContents");
  if (savedCanvas) {
    let img = new Image();
    img.src = savedCanvas;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
  }
});
