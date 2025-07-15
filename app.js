console.log("HIIIII");

// =============== DOM ELEMENTS ===============
const display = document.getElementById("currentOperationDisplay");
const lastDisplay = document.getElementById("lastOperationDisplay");
const buttons = document.querySelectorAll("button");

let currentInput = "0";
let operator = null;
let firstValue = null;

// =============== EVENT LISTENERS ===============
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const type = button.dataset.type;
    const value = button.value;
    e.preventDefault();

    switch (type) {
      case "number":
      case "decimal":
        if (type === "decimal" && currentInput.includes(".")) {
          break;
        }

        if (currentInput === "0" && type !== "decimal") {
          currentInput = value;
        } else {
          currentInput += value;
        }
        display.textContent = currentInput;
        break;

      case "operator":
        if (currentInput !== "" && currentInput !== "." && !operator) {
          firstValue = parseFloat(currentInput);
          operator = value;
          lastDisplay.textContent = `${firstValue} ${value}`;
          currentInput = "0";
          display.textContent = "0";
        }
        break;

      case "equal":
        if (firstValue !== null && operator && currentInput !== "") {
          const secondValue = parseFloat(currentInput);
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
                result = `Can't Divide By 0`;
              } else {
                result = firstValue / secondValue;
              }
              break;
            case "%":
              result = firstValue % secondValue;
              break;
          }
          lastDisplay.textContent = `${firstValue} ${operator} ${secondValue}`;
          display.textContent = result;

          if (result === `Can't Divide By 0`) {
            currentInput = "0";
            firstValue = null;
            operator = null;
          } else {
            currentInput = result.toString();
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
