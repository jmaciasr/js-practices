const numberList = document.getElementsByClassName("numbers__item");
let view = document.getElementsByClassName("view");
let number1 = "";
let number2 = "";
let btnClicked = "";
let currentOperator = "";

const cleanView = () => {
  view[0].value = 0;
  number1 = "";
  number2 = "";
  btnClicked = "";
  currentOperator = "";
  operator = "";
};

const printCalc = (val = null) => {
  view[0].value = val || number1 + " " + currentOperator + " " + number2;
  if (val) {
    number1 = val;
    currentOperator = "";
    number2 = "";
  }
};

const printOnView = e => {
  btnClicked = e.target.innerText;
  const operators = ["/", "+", "-", "x"];
  const allNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  if (!operators.includes(btnClicked) && allNumbers.includes(btnClicked)) {
    if (currentOperator) {
      number2 = number2 + btnClicked;
    } else {
      number1 = number1 + btnClicked;
      console.log(number1);
    }
    printCalc();
  }

  if ( !allNumbers.includes(btnClicked) && operators.includes(btnClicked) && !currentOperator && number1 ) {
    currentOperator = btnClicked;
    printCalc();
  }

  if (btnClicked === "=") {
    equal();
  }
};

const equal = () => {
  number1 = Number(number1);
  number2 = Number(number2);
  switch (currentOperator) {
    case "/":
      printCalc(number1 / number2);
      break;
    case "+":
      printCalc(number1 + number2);
      break;
    case "-":
      printCalc(number1 - number2);
      break;
    case "x":
      printCalc(number1 * number2);
      break;
    default:
      console.log("not operator");
      break;
  }
};

for (let i = 0; i < numberList.length; i++) {
  numberList[i].addEventListener("click", printOnView);
}

numberList[0].addEventListener("click", cleanView);
