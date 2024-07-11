import './style.css';


class Calculator {
    private currentInput: string;
    private previousInput: string;
    private operation: string | null;
  
    constructor() {
      this.currentInput = '';
      this.previousInput = '';
      this.operation = null;
      this.updateDisplay();
    }
  
    private calculate() {
      if (this.operation === null || this.previousInput === '' || this.currentInput === '') return;
  
      const prev = parseFloat(this.previousInput);
      const current = parseFloat(this.currentInput);
      if (isNaN(prev) || isNaN(current)) return;
  
      let result: number;
      switch (this.operation) {
        case '+':
          result = prev + current;
          break;
        case '-':
          result = prev - current;
          break;
        case '*':
          result = prev * current;
          break;
        case '/':
          result = prev / current;
          break;
        default:
          return;
      }
  
      this.currentInput = result.toString();
      this.operation = null;
      this.previousInput = '';
      this.updateDisplay();
    }
  
    public appendNumber(num: string) {
      if (num === '.' && this.currentInput.includes('.')) return;
      this.currentInput = this.currentInput + num;
      this.updateDisplay();
    }
  
    public chooseOperation(op: string) {
      if (this.currentInput === '') return;
      if (this.previousInput !== '') {
        this.calculate();
      }
      this.operation = op;
      this.previousInput = this.currentInput;
      this.currentInput = '';
      this.updateDisplay();
    }
  
    public clear() {
      this.currentInput = '';
      this.previousInput = '';
      this.operation = null;
      this.updateDisplay();
    }
  
    private updateDisplay() {
      const display = document.getElementById('display');
      if (display) {
        display.value = this.currentInput;
      }
    }
  }
  
  const calculator = new Calculator();
  
  (window as any).inputNumber = (num: number) => {
    calculator.appendNumber(num.toString());
  };
  
  (window as any).inputOperator = (op: string) => {
    calculator.chooseOperation(op);
  };
  
  (window as any).calculateResult = () => {
    calculator.calculate();
  };
  
  (window as any).clearDisplay = () => {
    calculator.clear();
  };
  