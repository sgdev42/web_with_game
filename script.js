const floorData = [
  { floor: 5, scenery: "5F 风景：屋顶花园，微风和远处天际线。" },
  { floor: 4, scenery: "4F 风景：图书角与窗边长椅，适合安静看书。" },
  { floor: 3, scenery: "3F 风景：游戏室，彩灯和欢笑声。" },
  { floor: 2, scenery: "2F 风景：美术教室，画板和颜料很热闹。" },
  { floor: 1, scenery: "1F 风景：大厅与绿植，阳光刚好。" }
];

const totalFloors = floorData.length;
const floorHeight = 110;
const elevator = document.getElementById("elevator");
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
}

function markCurrentFloor() {
  document.querySelectorAll(".floor").forEach((item) => {
    item.classList.toggle("current-floor", Number(item.dataset.floor) === currentFloor);
  });
}

function setDoor(open) {
  isDoorOpen = open;
  elevator.classList.toggle("open", open);
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
  statusEl.textContent = `电梯运行中：前往 ${targetFloor}F`;

  currentFloor = targetFloor;
  updateElevatorPosition();

  window.setTimeout(() => {
    isMoving = false;
    setButtonDisabled(false);
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
      <span class="scene">${item.scenery.replace(`${item.floor}F 风景：`, "")}</span>
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
updateTexts();
markCurrentFloor();
