console.log("HIIIII");

// =============== DOM ELEMENTS ===============
const display = document.getElementById("currentOperationDisplay");
const lastDisplay = document.getElementById("lastOperationDisplay");
const buttons = document.querySelectorAll("button");

const leFunnyTotallyNotLongMessageThatEveryoneLoves =
  "Imagine that you have zero cookies and you split them evenly among zero friends. How many cookies does each person get? See? It doesn’t make sense. And Cookie Monster is sad that there are no cookies, and you are sad that you have no friends.";

let currentInput = "0";
let operator = null;
let firstValue = null;
let resetDisplay = false;
let lastPressedOperator = false;

// =============== FUNCTIONS ===============

function handleNumber(value) {
  lastPressedOperator = false;
  if (resetDisplay) {
    currentInput = value;
    firstValue = null;
    operator = null;
    resetDisplay = false;
    lastDisplay.textContent = "HII";
    display.textContent = currentInput;
    return;
  }
  if (currentInput === "0") currentInput = value;
  else currentInput += value;
  display.textContent = currentInput;
}

function handleDecimal(value) {
  lastPressedOperator = false;
  if (resetDisplay) {
    currentInput = "0.";
    firstValue = null;
    operator = null;
    lastDisplay.textContent = "HII";
    resetDisplay = false;
  }
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
  resetDisplay = false;
  if (lastPressedOperator) {
    operator = value;
    lastDisplay.textContent = `${firstValue ?? currentInput} ${value}`;
    return;
  }
  lastPressedOperator = true;
  if (currentInput !== "" && !operator) {
    firstValue = parseFloat(currentInput);
    lastDisplay.textContent = `${firstValue} ${value}`;
    display.textContent = "0";
  } else if (currentInput !== "" && operator) {
    lastPressedOperator = false;
    secondValue = parseFloat(currentInput);
    const internalOperation = operate(operator, firstValue, secondValue);
    firstValue = typeof internalOperation === "number" ? internalOperation : 0;
    lastDisplay.textContent = `${firstValue} ${value}`;
    display.textContent = firstValue.toString();
  }
  operator = value;
  currentInput = "0";
}

function handleEquals() {
  if (firstValue !== null && operator && currentInput !== "") {
    const secondValue = parseFloat(currentInput);
    const result = operate(operator, firstValue, secondValue);

    lastDisplay.textContent = `${firstValue} ${operator} ${secondValue}`;
    if (typeof result === "number") {
      display.textContent = Number.isInteger(result)
        ? result.toString()
        : result.toFixed(2);
    } else {
      display.textContent = result;
    }

    resetDisplay = true;

    if (result === leFunnyTotallyNotLongMessageThatEveryoneLoves) {
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
      result = subtract(firstValue, secondValue);
      break;
    case "x":
      result = multiply(firstValue, secondValue);
      break;
    case "/":
      result = divide(firstValue, secondValue);
      break;
    case "%":
      result = percentage(firstValue, secondValue);
      break;
    default:
      result = "Invalid operator";
  }
  return result;
}

// FUNCTIONS FOR MATH OPERATIONS

function sum(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) {
    return leFunnyTotallyNotLongMessageThatEveryoneLoves;
  } else {
    return a / b;
  }
}
function percentage(a, b) {
  return multiply(a, divide(b, 100));
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
        resetDisplay = false;
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
