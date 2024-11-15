class Calculator {
  operandA = null;
  operandB = null;
  operator = "";
  display = null;
  isOn = false;

  constructor() {
    this.display = document.getElementById("display");
    this.addButtonListeners();
  }

  addButtonListeners() {
    this.addClickListenerForOn();
    this.addClickListenerForButtons();
    this.addClickListenersForNumbers();
    this.addClickListenersForOperators();
    this.addClickListenerForEquals();
    this.addClickListenerForClear();
    this.addClickListenerForNegativeNumber();
    this.addClickListenerForDecimal();
  }

  addClickListenerForOn() {
    const onButton = document.getElementById("on__button");
    const header = document.getElementsByClassName("display__header")[0];

    onButton.addEventListener("click", () => {
      if (this.isOn) {
        this.isOn = false;
        this.display.textContent = "";
        header.textContent = "";
      } else {
        this.isOn = true;
        header.textContent = "MATH";
      }
    });
  }

  addClickListenersForNumbers() {
    const numberButtons = document.getElementsByClassName("number");

    Array.from(numberButtons).forEach((button) => {
      button.addEventListener("click", () => {
        if (!this.isOn) {
          return;
        }

        if (this.operator == "") {
          if (this.operandA == null) {
            this.operandA = button.textContent;
          } else {
            this.operandA += button.textContent;
          }
          this.display.textContent = this.operandA;
        } else {
          if (this.operandB == null) {
            this.display.textContent = "";
            this.operandB = button.textContent;
          } else {
            this.operandB += button.textContent;
          }
          this.display.textContent = this.operandB;
        }
      });
    });
  }

  addClickListenerForButtons() {
    const buttons = document.getElementsByTagName("button");

    Array.from(buttons).forEach((button) => {
      button.addEventListener("click", () => {
        button.classList.add("clicked__button");
        setTimeout(() => {
          button.classList.remove("clicked__button");
        }, 100);
      });
    });
  }

  addClickListenersForOperators() {
    const operatorButtons = document.getElementsByClassName("operator");

    Array.from(operatorButtons).forEach((button) => {
      button.addEventListener("click", () => {
        if (this.isOn) {
          if (this.operator != "" && this.operandB != null) {
            this.calculateResult(this.operandA, this.operandB, this.operator);
          }
          switch (button.id) {
            case "divide":
              this.operator = "/";
              break;
            case "multiply":
              this.operator = "*";
              break;
            case "subtract":
              this.operator = "-";
              break;
            case "addition":
              this.operator = "+";
              break;
            case "modulus":
              this.operator = "%";
              break;
          }
        }
      });
    });
  }

  addClickListenerForEquals() {
    this.display = document.getElementById("display");
    const equalsButton = document.getElementById("equals");

    equalsButton.onclick = () => {
      if (this.isOn) {
        if (!this.operandA || !this.operandB || !this.operator) {
          return;
        }

        this.calculateResult(this.operandA, this.operandB, this.operator);
      }
    };
  }

  addClickListenerForClear() {
    this.display = document.getElementById("display");
    const clearButton = document.getElementById("clear");

    clearButton.addEventListener("click", () => {
      if (this.isOn) {
        this.display.textContent = "";
        this.operandA = null;
        this.operandB = null;
        this.operator = "";
      }
    });
  }

  addClickListenerForNegativeNumber() {
    const negativeButton = document.getElementById("negative__number");

    const toggleNegative = () => {
      if (this.operandA != null && this.operator == "") {
        this.operandA = this.operandA * -1;
      } else {
        this.operandB = this.operandB * -1;
      }
    };

    negativeButton.addEventListener("click", () => {
      if (this.display.textContent != "") {
        if (this.display.textContent.includes("-")) {
          this.display.textContent = this.display.textContent.replace("-", "");
          toggleNegative();
        } else {
          this.display.textContent = "-" + this.display.textContent;
          toggleNegative();
        }
      }
    });
  }

  addClickListenerForDecimal() {
    const decimalButton = document.querySelector("#decimal");

    const toggleDecimal = (operand) => {
      if (!operand) operand = "";
      if (operand.includes(".")) {
        operand = operand.toString().replace(".", "");
      } else {
        operand += ".";
      }
      return operand;
    };

    const toggleOperandWithDecimal = () => {
      if (this.operandA != null && this.operator == "") {
        this.operandA = toggleDecimal(this.operandA);
        this.display.textContent = this.operandA;
      } else if (this.operandB != null) {
        this.operandB = toggleDecimal(this.operandB);
        this.display.textContent = this.operandB;
      }
    };

    decimalButton.addEventListener("click", () => {
      toggleOperandWithDecimal();
    });
  }

  operate(operandA, operandB, operator) {
    operandA = parseFloat(operandA);
    operandB = parseFloat(operandB);
    switch (operator) {
      case "+":
        return this.add(operandA, operandB);
      case "-":
        return this.subtract(operandA, operandB);
      case "*":
        return this.multiply(operandA, operandB);
      case "/":
        return this.divide(operandA, operandB);
      case "%":
        return this.modulus(operandA, operandB);
    }
  }

  calculateResult(operandA, operandB, operator) {
    const result = this.operate(this.operandA, this.operandB, this.operator);

    this.display.textContent = result;
    this.operandA = Number(result);
    this.operandB = null;
    this.operator = "";
  }

  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
    const MAX_DECIMAL_PLACES = 5;
    const result = a / b;

    if (
      result.toString().includes(".") &&
      result.toString().split(".")[1].length > MAX_DECIMAL_PLACES
    ) {
      result = result.toFixed(MAX_DECIMAL_PLACES);
    }

    return result;
  }

  modulus(a, b) {
    return a % b;
  }
}

calculator = new Calculator();
console.log(calculator.operate(1, 2, "+"));
