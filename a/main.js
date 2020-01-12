// QUERYING THE DOM
const doors = document.querySelectorAll('.door img');
const commentary = document.getElementById('commentary');
const playBtn = document.getElementById('play-button');

// GETTING THE DOORS
const door1 = document.getElementById('door1');
const door2 = document.getElementById('door2');
const door3 = document.getElementById('door3');

// GETTING THE OPENED DOOR PATHS
const closedDoor = 'doorImages/closed_door.jpg';
const botDoor = 'doorImages/robot.jpg';
const beachDoor = 'doorImages/beach.jpg';
const spaceDoor = 'doorImages/space.jpg';

// SETTING THE INITIAL DOOR STATES
Array.from(doors).forEach((door) => (door.src = closedDoor));

// SETTING THE INITIAL COMMENTARY TEXT
const initialCommentaryTextContent = 'Choose Your Doors';
const initialPlayBtnTextContent = 'Play Game';

function textInitializer() {
	commentary.textContent = initialCommentaryTextContent;
	playBtn.textContent = initialPlayBtnTextContent;
}

textInitializer();

// GAME FUNCTIONALITY STARTS UNDER THIS LINE
let closedDoorCount = 0;
foundBot = false;

// setting potential door states
let openedDoor1;
let openedDoor2;
let openedDoor3;

// door src randomiser
function randomiseDoors() {
	let rand = Math.floor(Math.random() * 3);

	switch (rand) {
		case 0:
			openedDoor1 = botDoor;
			openedDoor2 = spaceDoor;
			openedDoor3 = beachDoor;
			break;
		case 1:
			openedDoor1 = spaceDoor;
			openedDoor2 = beachDoor;
			openedDoor3 = botDoor;
			break;
		case 2:
			openedDoor1 = beachDoor;
			openedDoor2 = botDoor;
			openedDoor3 = spaceDoor;
			break;
	}
}
randomiseDoors();

function door1Event(e) {
	door1.src = openedDoor1;
	closedDoorCount++;
	botCheck(door1.src);
	e.target.removeEventListener('click', door1Event); // newly added
}

function door2Event(e) {
	door2.src = openedDoor2;
	closedDoorCount++;
	botCheck(door2.src);
	e.target.removeEventListener('click', door2Event); // newly added
}

function door3Event(e) {
	door3.src = openedDoor3;
	closedDoorCount++;
	botCheck(door3.src);
	e.target.removeEventListener('click', door3Event); // newly added
}

function addEventListeners() {
	door1.addEventListener('click', door1Event);

	door2.addEventListener('click', door2Event);

	door3.addEventListener('click', door3Event);
}
addEventListeners();

function botCheck(src) {
	if (src.substring(22) == botDoor) {
		foundBot = true;
		//console.log(foundBot);
	}

	determineWinner(src);
}

function determineWinner() {
	if (closedDoorCount < 3 && foundBot) {
		commentary.textContent = 'You Lost';
		haltGame();
	} else if (closedDoorCount == 2 && !foundBot) {
		commentary.textContent = 'You Won!';
	} else if (closedDoorCount >= 3) {
		setTimeout(() => {
			playBtn.textContent = 'Play Again?';
		}, 1000);
		//playBtn.textContent = 'Play Again?';
	}
}

function haltGame() {
	door1.removeEventListener('click', door1Event);
	door2.removeEventListener('click', door2Event);
	door3.removeEventListener('click', door3Event);
	//playBtn.textContent = 'Play Again?';
	setTimeout(() => {
		playBtn.textContent = 'Play Again?';
	}, 1000);
}

playBtn.addEventListener('click', (e) => {
	Array.from(doors).forEach((door) => {
		door.src = closedDoor;
	});
	closedDoorCount = 0;
	foundBot = false;
	textInitializer();
	randomiseDoors();
	addEventListeners();
});
