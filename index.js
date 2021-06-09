
let input;
let firstNumber;
let operator;
let clearFlag = true;
let operations = [];

window.onload = () => {
    let numbers = document.getElementsByClassName('number');
    for (let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener('click', () => numberInput(numbers[i].innerHTML))
    }

    operations = document.querySelectorAll('button[class$="operation"]');
    for (let i = 0; i < operations.length; i++) {
        operations[i].addEventListener('click', () => chooseOperation(operations[i].className))
    }

    document.getElementsByClassName('percent')[0].addEventListener('click', () => calculatePercent())
    document.getElementsByClassName('claculator-clear__button')[0].addEventListener('click', () => clearCalculator())
    document.getElementsByClassName('equal__button')[0].addEventListener('click', () => { clearFlag = true; calculate(parseFloat(input.value)) })

    input = document.getElementsByTagName('input')[0];
}

let chooseOperation = (className) => {
    clearFlag = false

    if (input.value != "") {
        if (operator !== undefined)
            calculate(parseFloat(input.value));

        firstNumber = parseFloat(input.value);
        operator = className;
        input.value = "0";
        clearFlag = true;
    } else {
        operator = className;
    }

    highlightSelectedOperation(className);
}

let highlightSelectedOperation = (className) => {
    for (let i = 0; i < operations.length; i++) {
        if (operations[i].classList.contains(className))
            operations[i].style.backgroundColor = 'tomato';
        else
            operations[i].style.backgroundColor = 'cornflowerblue';
    }
}

let removeHighlight = () => {
    for (let i = 0; i < operations.length; i++) {
        operations[i].style.backgroundColor = 'cornflowerblue';
    }
}

let calculate = (secondNumber) => {
    removeHighlight();
    console.log(`first number: ${firstNumber}, second number: ${secondNumber}, operator: ${operator}`)

    let result;
    switch (operator) {
        case "division__operation":
            result = firstNumber / secondNumber;
            break;
        case "multiplication__operation":
            result = firstNumber * secondNumber;
            break;
        case "substraction__operation":
            result = firstNumber - secondNumber;
            break;
        case "addition__operation":
            result = firstNumber + secondNumber;
            break;
        default:
            result = firstNumber;
    }

    firstNumber = result;
    input.value = Number(result.toFixed(15));
    operator = undefined;
}

let numberInput = (number) => {
    if (clearFlag === true)
        input.value = "";
    clearFlag = false;

    input.value = (input.value + number);
}

let clearCalculator = () => {
    firstNumber = undefined;

    input.value = "0";
    clearFlag = true;

    operator = undefined;
    removeHighlight();
}

let calculatePercent = () => {
    input.value = parseFloat(input.value)/100
}
