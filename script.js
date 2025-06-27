document.addEventListener('DOMContentLoaded', function () {
    // Calculator state
    let firstNumber = '';
    let secondNumber = '';
    let currentOperator = null;
    let shouldResetScreen = false;

    // DOM elements
    const numberButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('.operator');
    const equalsButton = document.querySelector('[data-operator="="]')
    const clearButton = document.querySelector('.clear');
    const backspaceButton = document.querySelector('.backspace');
    const decimalButton = document.querySelector('.decimal');
    const plusMinusButton = document.querySelector('.plus-minus');
    const previousOperandDisplay = document.querySelector('.previous-operand');
    const currentOperandDisplay = document.querySelector('.current-operand');

    // Event listener
    equalsButton.addEventListener('click', evaluate);
    clearButton.addEventListener('click', clear);
    backspaceButton.addEventListener('click', backspace);
    decimalButton.addEventListener('click', addDecimal);
    plusMinusButton.addEventListener('click', toggleSign);

    numberButtons.forEach(button => {
        button.addEventListener('click', () => addNumber(button.textContent));
    });

    operatorButtons.forEach(button => {
        button.addEventListener('click', () => setOperation(button.textContent));
    });

    // Functions
    function addNumber(number) {
        if (currentOperandDisplay.textContent === '0' || shouldResetScreen) {
            resetScreen();
        }
        currentOperandDisplay.textContent += number;
    }

    function resetScreen() {
        currentOperandDisplay.textContent = '';
        shouldResetScreen = false;
    }

    function addDecimal() {
        if (shouldResetScreen) resetScreen();
        if (currentOperandDisplay.textContent.includes('.')) return;
        if (currentOperandDisplay.textContent === '') {
            currentOperandDisplay.textContent = '0';
        }
        currentOperandDisplay.textContent += '.';
    }

    function backspace() {
        if (shouldResetScreen) return;

        if (currentOperandDisplay.textContent.length === 1 || currentOperandDisplay.textContent === '-') {
            currentOperandDisplay.textContent = '0';
        } else if (currentOperandDisplay.textContent === '0') {
            return;
        } else {
            currentOperandDisplay.textContent = currentOperandDisplay.textContent.slice(0, -1);
        }
    }

    function clear() {
        currentOperandDisplay.textContent = '0';
        previousOperandDisplay.textContent = '';
        firstNumber = '';
        secondNumber = '';
        currentOperator = null;
        shouldResetScreen = false;
        console.log('Calculator cleared');
    }

    function setOperation(operator) {
        if (currentOperandDisplay.textContent === '') return;
        if (currentOperandDisplay !== null) evaluate();

        firstNumber = currentOperandDisplay.textContent;
        currentOperator = operator;
        previousOperandDisplay.textContent = `${firstNumber} ${currentOperator}`;
        shouldResetScreen = true;
    }

    function evaluate() {
        if (currentOperator === null || shouldResetScreen) return;
        if (currentOperator === '/' && currentOperandDisplay.textContent === '0') {
            currentOperandDisplay.textContent = 'Error: Division by zero!';
            previousOperandDisplay.textContent = '';
            firstNumber = '';
            secondNumber = '';
            currentOperator = null;
            return;
        }

        secondNumber = currentOperandDisplay.textContent;
        currentOperandDisplay.textContent = computeResult();
        
        previousOperandDisplay.textContent = `${firstNumber} ${currentOperator} ${secondNumber}`;
        currentOperator = null;
    }

    function computeResult() {
        const first = parseFloat(firstNumber);
        const second = parseFloat(secondNumber);

        switch (currentOperator) {
            case '+': return first + second;
            case '-': return first - second;
            case '×': return first * second;
            case '÷': return first / second;
            case '%': return first % second;
            default:
                return;
        }
    }

    function toggleSign() {
        if (currentOperandDisplay.textContent === '0') {
            currentOperandDisplay.textContent = '-' + '';
        }
    
        if (currentOperandDisplay.textContent.startsWith('-')) {
            currentOperandDisplay.textContent = currentOperandDisplay.textContent.substring(1);
        } else {
            currentOperandDisplay.textContent = '-' + currentOperandDisplay.textContent;
        }
    }
});