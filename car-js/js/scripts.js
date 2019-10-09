const controlBlock = document.getElementById('controlBlock');
const control = document.getElementById('control');
const controlUnblock = document.getElementById('controlUnblock');
const doorBtn = document.getElementById('doorBtn');
const backBtn = document.getElementById('backBtn');
const roofBtn = document.getElementById('roofBtn');
const frontBtn = document.getElementById('frontBtn');
const doors = document.getElementById('doors');
const back = document.getElementById('back');
const roof = document.getElementById('roof');
const front = document.getElementById('front');
const car = document.getElementById('car');
const engine = document.getElementById('engine');

var isBlock = true;
var currentDoor = '';
var doorState = {
  doorsOpen: false,
  backOpen: false,
  fronOpen: false,
  roofOpen: false,
}
var engineOn = false;

const selectDoor = e => {
  if (isBlock === false) {
    e.target.classList.toggle('active')
  }
}

const blockCar = () => {
  control.classList.add('blocked');
  isBlock = true
};

const unblockCar = () => {
  control.classList.remove('blocked');
  isBlock = false
};

const openCar = (e) => {
  currentDoor = e.target.getAttribute('data-part');
  if (isBlock === true) {
    alert('The car is blocked');
  }

  if (isBlock === false) {
    openDoor(doorState)
  }
};

const openClose = (stateDoor, part, indicator) => {
  const carPart = `${part}Open`;
  if (!stateDoor) {
    doorState[carPart] = true;
    indicator.classList.add('active')
  } else {
    doorState[carPart] = false;
    indicator.classList.remove('active')
  }
}

const openDoor = (doorState) => {
  switch (currentDoor) {
    case 'door':
      openClose(doorState.doorsOpen, 'doors', doors);
    break;
    case 'back':
        openClose(doorState.backOpen, 'back', back);
    break;
    case 'front':
        openClose(doorState.frontOpen, 'front', front);
    break;
    case 'roof':
      openClose(doorState.roofOpen, 'roof', roof);
    break;
    default:
    break;
  }
}

const onOf = () => {
  engine.classList.toggle('active');
  if (!engineOn) {
    engineOn = true;
  } else {
    engineOn = false; 
  }
};

car.addEventListener('click', selectDoor);
controlBlock.addEventListener('click', blockCar);
controlUnblock.addEventListener('click', unblockCar);
engine.addEventListener('click', onOf);
doorBtn.addEventListener('click', openCar);
backBtn.addEventListener('click', openCar);
roofBtn.addEventListener('click', openCar);
frontBtn.addEventListener('click', openCar);