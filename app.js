console.log("HIIIII");

// =============== DOM ELEMENTS ===============
const display = document.getElementById("currentOperationDisplay");
const lastDisplay = document.getElementById("lastOperationDisplay");
const buttons = document.querySelectorAll("button");

let currentInput = "0";
let operator = null;
let firstValue = null;

// =============== FUNCTIONS ===============

function handleNumber(value) {
  if (currentInput === "0") currentInput = value;
  else currentInput += value;
  display.textContent = currentInput;
}

function handleDecimal(value) {
  if (!currentInput.includes(".")) {
    if (currentInput === "0" || currentInput === "") {
      currentInput = "0.";
    } else {
      currentInput += value;
    }
    display.textContent = currentInput;
  }
}

function handleOperator(value) {
  if (currentInput !== "" && !operator) {
    firstValue = parseFloat(currentInput);
    operator = value;
    lastDisplay.textContent = `${firstValue} ${value}`;
    currentInput = "0";
    display.textContent = "0";
  }
}

function handleEquals() {
  if (firstValue !== null && operator && currentInput !== "") {
    const secondValue = parseFloat(currentInput);
    const result = operate(operator, firstValue, secondValue);

    lastDisplay.textContent = `${firstValue} ${operator} ${secondValue}`;
    display.textContent = result;

    if (result === "Can't Divide By 0") {
      currentInput = "0";
      firstValue = null;
      operator = null;
    } else {
      currentInput = String(result);
      firstValue = null;
      operator = null;
    }
  }
}

function operate(operator, firstValue, secondValue) {
  let result;
  switch (operator) {
    case "+":
      result = sum(firstValue, secondValue);
      break;
    case "-":
      result = substract(firstValue, secondValue);
      break;
    case "x":
      result = multiply(firstValue, secondValue);
      break;
    case "/":
      result = divide(firstValue, secondValue);
      break;
    case "%":
      result = modulo(firstValue, secondValue);
      break;
    default:
      result =
       "Invalid operator";
  }
  return result;
}

// FUNCTIONS FOR MATH OPERATIONS

function sum(a, b) {
  return a + b;
}
function substract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) {
    return "Can't Divide By 0";
  } else {
    return a / b;
  }
}
function modulo(a, b) {
  return a % b;
}

// =============== EVENT LISTENERS ===============
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const type = button.dataset.type;
    const value = button.value;
    e.preventDefault();

    switch (type) {
      case "number":
        handleNumber(value);
        break;
      case "decimal":
        handleDecimal(value);
        break;

      case "operator":
        handleOperator(value);
        break;

      case "equal":
        handleEquals();
        break;

      case "reset":
        currentInput = "0";
        firstValue = null;
        operator = null;
        display.textContent = "0";
        lastDisplay.textContent = "Hello World!";
        break;
      case "backspace":
        currentInput = currentInput.slice(0, -1);
        if (currentInput === "") currentInput = "0";
        display.textContent = currentInput;
        break;
    }
  });
});

// =============== Keyboard Support ===============
document.addEventListener("keydown", (e) => {
  e.preventDefault();
  let button = document.querySelector(`button[value="${e.key}"]`);

  if (e.key === "Enter") {
    button = document.querySelector(`button[data-type="equal"]`);
  } else if (e.key === "*") {
    button = document.querySelector(`button[value="x"]`);
  } else if (e.key === "Backspace") {
    button = document.querySelector(`button[data-type="backspace"]`);
  } else if (e.key === "Escape") {
    button = document.querySelector(`button[data-type="reset"]`);
  }
  if (button) {
    button.click();
  }
});
