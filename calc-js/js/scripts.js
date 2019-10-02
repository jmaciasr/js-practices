const numberList = document.getElementsByClassName('numbers__item');
let view = document.getElementsByClassName('view');
let number1 = "";
let number2;
let btnClicked;
let currentOperator = "";
let operator = "";

const cleanView = () => {
  view[0].value = 0;
  number1 = "";
  number2 = undefined;
  btnClicked = undefined;
  currentOperator = "";
  operator = "";
};

const printOnView = (e) => {
  btnClicked = e.target.innerText;

  if (btnClicked !== "/" && btnClicked !== "+" && btnClicked !== "-" &&  btnClicked !== "x" &&  btnClicked !== "=" &&  btnClicked !== "C" &&  currentOperator == "") {
    number1 = number1 + btnClicked;
    view[0].value = number1;
  } else if (number1 !== "" && number2 == undefined) {
    currentOperator = btnClicked;
    operator = btnClicked;
    number2 = "";
    view[0].value = currentOperator;
  } else if (currentOperator === "/" || currentOperator === "+" || currentOperator === "-" ||  currentOperator === "x") {
    number2 = number2 + btnClicked;
    currentOperator = "";
    view[0].value = number2;
  }
}

const equal = (num1,num2) => {
  console.log(operator);
  switch (operator) {
    case "/":
      console.log("entró a dividir");
      parseInt(number1)
      parseInt(number2)
      console.log(number1);
      const division = () => {
        let operation = parseInt(number1 / number2);
        console.log(operation);
      }
      break;
    // case "+":
    //   operation(number1, +, number2);    
    //   break;
    // case "-":
    //   operation(number1, -, number2);    
    //   break;
    // case "x":
    //   operation(number1, *, number2);   
    //   break;
    default:
        console.log("not operator");
      break;
  }
}

for (let i = 0; i < numberList.length; i++) {
  numberList[i].addEventListener("click", printOnView );
}

numberList[0].addEventListener("click", cleanView );
numberList[19].addEventListener("click", equal );
// numberList[3].addEventListener("click", currentOperator );
// numberList[7].addEventListener("click", currentOperator );
// numberList[11].addEventListener("click", currentOperator );
// numberList[15].addEventListener("click", currentOperator );