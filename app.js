console.log("HIIIII");

// =============== DOM ELEMENTS ===============
const display = document.getElementById("currentOperationDisplay");
const lastDisplay = document.getElementById("lastOperationDisplay");
const buttons = document.querySelectorAll("#buttons-grid button");

let currentInput = "0";
let operator = null;
let firstValue = 0;

// =============== EVENT LISTENERS ===============
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const type = button.dataset.type;
    const value = button.value;
    e.preventDefault();

    console.log(buttons.length, buttons);
    console.log("clicked", button.value, "type:", button.dataset.type);

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
    }
  });
});
