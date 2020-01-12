// QUERYING THE DOM
const doors = document.querySelectorAll(".door");
const commentary = document.querySelector("#commentary");
const playBtn = document.querySelector("#play-button");

// individual doors
const door1 = document.querySelector(".door1");
const door2 = document.querySelector(".door2");
const door3 = document.querySelector(".door3");

// POTENTIAL DOOR PATHS
const closedDoor = "doorImages/closed_door.jpg";
const botDoor = "doorImages/robot.jpg";
const spaceDoor = "doorImages/space.jpg";
const beachDoor = "doorImages/beach.jpg";

// GAME FUNCTIONALITY STARTS UNDER THIS LINE

// initial texts
const initialCommTextContent = "Choose Your Doors";
const initialPlayBtnTextContent = "Reset Progress";

let openedDoorCount = 0;
let foundBot = false;

// setting potential door states
let openedDoor1;
let openedDoor2;
let openedDoor3;

// randomising states
function randomiseDoors() {
  let rand = Math.floor(Math.random() * 3);

  switch (rand) {
    case 0:
      openedDoor1 = botDoor;
      openedDoor2 = beachDoor;
      openedDoor3 = spaceDoor;
      break;
    case 1:
      openedDoor1 = beachDoor;
      openedDoor2 = spaceDoor;
      openedDoor3 = botDoor;
      break;
    case 2:
      openedDoor1 = spaceDoor;
      openedDoor2 = botDoor;
      openedDoor3 = beachDoor;
      break;
  }
}
randomiseDoors();

// setting event functions
function door1Event(e) {
  door1.src = openedDoor1;
  openedDoorCount++;

  botCheck(door1.src);
  door1.removeEventListener("click", door1Event);
}

function door2Event(e) {
  door2.src = openedDoor2;
  openedDoorCount++;

  botCheck(door2.src);
  door2.removeEventListener("click", door2Event);
}

function door3Event(e) {
  door3.src = openedDoor3;
  openedDoorCount++;

  botCheck(door3.src);
  door3.removeEventListener("click", door3Event);
}

// adding the event listeners
function addEventListeners() {
  door1.addEventListener("click", door1Event);
  door2.addEventListener("click", door2Event);
  door3.addEventListener("click", door3Event);
}
addEventListeners();

// checking bot
function botCheck(src) {
  if (src.length > 26) {
    if (src.substring(22) == botDoor) {
      foundBot = true;
      //determineWinner();
    }
  } else if (src == botDoor) {
    foundBot = true;
    //determineWinner();
  }
  // if (src.substring(22) == botDoor) {
  // 	foundBot = true;
  // }
  determineWinner();
}

function determineWinner() {
  if (openedDoorCount < 3 && foundBot) {
    commentary.textContent = "You Lost";
    haltGame();
    playBtn.textContent = "Play Again?";
  } else if (openedDoorCount == 2 && !foundBot) {
    commentary.textContent = "You Won!";
  } else if (openedDoorCount == 3) {
    playBtn.textContent = "Play Again?";
  }
}

function haltGame() {
  door1.removeEventListener("click", door1Event);
  door2.removeEventListener("click", door2Event);
  door3.removeEventListener("click", door3Event);
}

playBtn.addEventListener("click", e => {
  doors.forEach(door => (door.src = closedDoor));
  openedDoorCount = 0;
  foundBot = false;
  randomiseDoors();
  addEventListeners();
  commentary.textContent = initialCommTextContent;
  playBtn.textContent = initialPlayBtnTextContent;
});
