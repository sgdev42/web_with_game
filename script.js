const floorData = [
  { floor: 5, image: "assets/scenes/floor-5-rooftop-v2.jpg" },
  { floor: 4, image: "assets/scenes/floor-4-library-v2.jpg" },
  { floor: 3, image: "assets/scenes/floor-3-game-room-v2.jpg" },
  { floor: 2, image: "assets/scenes/floor-2-art-room-v2.jpg" },
  { floor: 1, image: "assets/scenes/floor-1-lobby-v2.jpg" }
];

const camera = document.getElementById("camera");
const sceneImageEl = document.getElementById("scene-image");
const floorChipEl = document.getElementById("floor-chip");
const buttonsEl = document.getElementById("floor-buttons");
const statusEl = document.getElementById("status");
const openDoorBtn = document.getElementById("open-door");
const closeDoorBtn = document.getElementById("close-door");

let currentFloor = 1;
let isMoving = false;

function updatePanel() {
  floorChipEl.textContent = String(currentFloor);
  document.querySelectorAll(".floor-btn").forEach((btn) => {
    btn.classList.toggle("active", Number(btn.dataset.floor) === currentFloor);
  });
}

function setStatus(text, moving = false) {
  statusEl.textContent = text;
  statusEl.classList.toggle("moving", moving);
}

function setDoor(open) {
  camera.classList.toggle("open", open);
}

function updateSceneImage() {
  const floorInfo = floorData.find((f) => f.floor === currentFloor);
  if (!floorInfo) return;
  sceneImageEl.src = floorInfo.image;
  sceneImageEl.alt = `${currentFloor}楼电梯外场景`;
}

function setFloorButtonsDisabled(disabled) {
  document.querySelectorAll(".floor-btn").forEach((btn) => {
    btn.disabled = disabled;
  });
}

function goToFloor(targetFloor) {
  if (isMoving || targetFloor === currentFloor) return;

  isMoving = true;
  setDoor(false);
  setFloorButtonsDisabled(true);
  openDoorBtn.disabled = true;
  closeDoorBtn.disabled = true;
  camera.classList.add("moving");
  setStatus(`MOVING ${currentFloor} -> ${targetFloor}`, true);

  window.setTimeout(() => {
    currentFloor = targetFloor;
    updateSceneImage();
    updatePanel();
    camera.classList.remove("moving");
    setFloorButtonsDisabled(false);
    openDoorBtn.disabled = false;
    closeDoorBtn.disabled = false;
    isMoving = false;
    setStatus("ARRIVED", false);
  }, 1600);
}

function renderFloorButtons() {
  [5, 4, 3, 2, 1].forEach((floor) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "floor-btn";
    button.dataset.floor = String(floor);
    button.textContent = String(floor);
    button.addEventListener("click", () => goToFloor(floor));
    buttonsEl.appendChild(button);
  });
}

openDoorBtn.addEventListener("click", () => {
  if (!isMoving) {
    setDoor(true);
    setStatus("DOOR OPEN", false);
  }
});

closeDoorBtn.addEventListener("click", () => {
  if (!isMoving) {
    setDoor(false);
    setStatus("DOOR CLOSED", false);
  }
});

renderFloorButtons();
updateSceneImage();
updatePanel();
setDoor(false);
setStatus("IDLE", false);
