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

function calculate(operator, firstValue, secondValue) {
  let result;
  switch (operator) {
    case "+":
      result = firstValue + secondValue;
      break;
    case "-":
      result = firstValue - secondValue;
      break;
    case "x":
      result = firstValue * secondValue;
      break;
    case "/":
      if (secondValue === 0) {
        return "Can't Divide By 0";
      } else {
        result = firstValue / secondValue;
      }
      break;
    case "%":
      result = firstValue % secondValue;
      break;
    default:
      return "Invalid operator";
  }
  return result;
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
        if (firstValue !== null && operator && currentInput !== "") {
          const secondValue = parseFloat(currentInput);
          const result = calculate(operator, firstValue, secondValue);

          lastDisplay.textContent = `${firstValue} ${operator} ${secondValue}`;
          display.textContent = result;

          if (result === "Can't Divide By 0" || result === "Result too large") {
            currentInput = "0";
            firstValue = null;
            operator = null;
          } else {
            currentInput = String(result);
            firstValue = null;
            operator = null;
          }
        }
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
