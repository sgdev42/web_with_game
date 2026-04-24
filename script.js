const floorData = [
  {
    floor: 5,
    scenery: "5F 场景：屋顶花园与城市天际线。",
    image: "assets/scenes/floor-5-rooftop.jpg"
  },
  {
    floor: 4,
    scenery: "4F 场景：书架环绕的图书区。",
    image: "assets/scenes/floor-4-library.jpg"
  },
  {
    floor: 3,
    scenery: "3F 场景：活力游戏空间。",
    image: "assets/scenes/floor-3-game-room.jpg"
  },
  {
    floor: 2,
    scenery: "2F 场景：光线充足的美术工作室。",
    image: "assets/scenes/floor-2-art-room.jpg"
  },
  {
    floor: 1,
    scenery: "1F 场景：现代大厅入口。",
    image: "assets/scenes/floor-1-lobby.jpg"
  }
];

const totalFloors = floorData.length;
const floorHeight = 110;
const elevator = document.getElementById("elevator");
const camera = document.getElementById("camera");
const sceneImageEl = document.getElementById("scene-image");
const floorChipEl = document.getElementById("floor-chip");
const floorsEl = document.getElementById("floors");
const buttonsEl = document.getElementById("floor-buttons");
const statusEl = document.getElementById("status");
const sceneryEl = document.getElementById("scenery");
const openDoorBtn = document.getElementById("open-door");
const closeDoorBtn = document.getElementById("close-door");

let currentFloor = 1;
let isMoving = false;
let isDoorOpen = false;

function floorToIndex(floor) {
  return totalFloors - floor;
}

function updateElevatorPosition() {
  const index = floorToIndex(currentFloor);
  const moveY = index * floorHeight;
  elevator.style.transform = `translateY(${moveY}px)`;
}

function updateTexts() {
  const floorInfo = floorData.find((f) => f.floor === currentFloor);
  statusEl.textContent = `当前楼层：${currentFloor}F`;
  sceneryEl.textContent = floorInfo ? floorInfo.scenery : "";
  floorChipEl.textContent = `${currentFloor}F`;
}

function updateSceneImage() {
  const floorInfo = floorData.find((f) => f.floor === currentFloor);
  if (!floorInfo) {
    return;
  }

  sceneImageEl.src = floorInfo.image;
  sceneImageEl.alt = `${currentFloor}楼电梯外场景`;
}

function markCurrentFloor() {
  document.querySelectorAll(".floor").forEach((item) => {
    item.classList.toggle("current-floor", Number(item.dataset.floor) === currentFloor);
  });
}

function setDoor(open) {
  isDoorOpen = open;
  elevator.classList.toggle("open", open);
  camera.classList.toggle("open", open);
}

function setButtonDisabled(disabled) {
  document.querySelectorAll(".goto-floor").forEach((btn) => {
    btn.disabled = disabled;
  });
}

function goToFloor(targetFloor) {
  if (isMoving || targetFloor === currentFloor) {
    return;
  }

  setDoor(false);
  isMoving = true;
  setButtonDisabled(true);
  camera.classList.add("moving");
  statusEl.textContent = `电梯运行中：前往 ${targetFloor}F`;

  currentFloor = targetFloor;
  updateElevatorPosition();

  window.setTimeout(() => {
    isMoving = false;
    setButtonDisabled(false);
    camera.classList.remove("moving");
    updateSceneImage();
    updateTexts();
    markCurrentFloor();
  }, 1350);
}

function renderFloors() {
  floorData.forEach((item) => {
    const floor = document.createElement("div");
    floor.className = "floor";
    floor.dataset.floor = String(item.floor);
    floor.innerHTML = `
      <span class="floor-num">${item.floor}F</span>
      <span class="scene">${item.scenery.replace(`${item.floor}F 场景：`, "")}</span>
    `;
    floorsEl.appendChild(floor);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "goto-floor";
    button.textContent = `${item.floor}F`;
    button.addEventListener("click", () => goToFloor(item.floor));
    buttonsEl.appendChild(button);
  });
}

openDoorBtn.addEventListener("click", () => {
  if (!isMoving) {
    setDoor(true);
  }
});

closeDoorBtn.addEventListener("click", () => {
  if (!isMoving) {
    setDoor(false);
  }
});

renderFloors();
updateElevatorPosition();
updateSceneImage();
updateTexts();
markCurrentFloor();
