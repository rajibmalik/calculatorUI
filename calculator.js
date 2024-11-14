class Calculator {
  operandA = null;
  operandB = null;
  operator = "";
  display = null;
  isOn = false;

  constructor() {
    this.addButtonListeners();
  }

  addButtonListeners() {
    this.addClickListenersForNumbers();
    this.addClickListenersForOperators();
    this.addClickListenerForEquals();
    this.addClickListenerForClear();
  }

  addClickListenersForNumbers() {
    this.display = document.getElementById("display");
    let numberButtons = document.getElementsByClassName("number");

    Array.from(numberButtons).forEach((button) => {
      button.addEventListener("click", () => {
        button.classList.add("clicked__button");
        setTimeout(() => {
          button.classList.remove("clicked__button");
        }, 100);
      });

      button.addEventListener("click", () => {
        if (this.operandA == null || this.operator == "") {
          if (this.operandA == null) {
            this.operandA = Number(button.textContent);
            console.log(this.operandA);
          } else {
            this.operandA = Number(this.operandA + button.textContent);
            console.log(this.operandA);
          }
          this.display.textContent += button.textContent;
          console.log("Operand A: " + this.operandA);
        } else {
          if (this.operandB == null) {
            this.operandB = Number(button.textContent);
            console.log("Operand B: " + this.operandB);
          } else {
            this.operandB = Number(this.operandB + button.textContent);
          }
          this.display.textContent = "";
          this.display.textContent += this.operandB;
          console.log("Operand B: " + this.operandB);
        }
      });
    });
  }

  addClickListenersForOperators() {
    let operatorButtons = document.getElementsByClassName("operator");

    Array.from(operatorButtons).forEach((button) => {
      console.log("OPERATOR: " + this.operator);
      button.addEventListener("click", () => {
        if (this.operator != "") {
          this.calculateResult(this.operandA, this.operandB, this.operator);
        }
        switch (button.id) {
          case "divide":
            this.operator = "/";
            console.log(this.operator);
            break;
          case "multiply":
            this.operator = "*";
            console.log(this.operator);
            break;
          case "subtract":
            this.operator = "-";
            console.log(this.operator);
            break;
          case "addition":
            this.operator = "+";
            console.log(this.operator);
            break;
          case "modulus":
            this.operator = "%";
            console.log(this.operator);
            break;
        }
      });
    });
  }

  addClickListenerForEquals() {
    this.display = document.getElementById("display");
    let equals = document.getElementById("equals");

    equals.onclick = () => {
      if (!this.operandA || !this.operandB || !this.operator) {
        return;
      }

      this.calculateResult(this.operandA, this.operandB, this.operator);
    };
  }

  addClickListenerForClear() {
    this.display = document.getElementById("display");
    let clear = document.getElementById("clear");

    clear.addEventListener("click", () => {
      this.display.textContent = "";
      this.operandA = null;
      this.operandB = null;
      this.operator = "";
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
    let result = this.operate(this.operandA, this.operandB, this.operator);

    this.display.textContent = result;
    this.operandA = Number(result);
    this.operandB = null;
    this.operator = "";
    console.log(`Result ${this.operandA}`);
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
    let result = a / b;

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
