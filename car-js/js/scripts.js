const controlBlock = document.getElementById('controlBlock');
const control = document.getElementById('control');
const controlUnblock = document.getElementById('controlUnblock');
const doorBtn = document.getElementById('doorBtn');
const backBtn = document.getElementById('backBtn');
const roofBtn = document.getElementById('roofBtn');
const frontBtn = document.getElementById('frontBtn');
const car = document.getElementById('car');
// const dataPart = ['door','back','front', 'roof'];


let isBlock = true;
let currentDoor = '';

const selectDoor = e => {
  currentDoor = e.target.getAttribute('data-part');
  console.log('data = ' + currentDoor);
}

const blockCar = () => {
  control.classList.add('blocked');
  isBlock = true
};

const unblockCar = () => {
  control.classList.remove('blocked');
  isBlock = false
  console.log('data = ' + currentDoor);
};

const openCar = () => {
  if (isBlock === true) {
    alert('The car is blocked');
  }

  if (isBlock === false) {
    openDoor()
    console.log('Now is open', currentDoor)
  } 
};

const openDoor = () => {
  switch (currentDoor) {
    case 'door':
      console.log('open the door')
      break;
  
    default:
      break;
  }
}

car.addEventListener('click', selectDoor);
controlBlock.addEventListener('click', blockCar);
controlUnblock.addEventListener('click', unblockCar);
doorBtn.addEventListener('click', openCar);
backBtn.addEventListener('click', openCar);
roofBtn.addEventListener('click', openCar);
frontBtn.addEventListener('click', openCar);