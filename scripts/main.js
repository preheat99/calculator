const buttonElement = document.querySelectorAll('.keys');
const displayElement = document.querySelector(".display");
const bodyElement = document.querySelector("body");


let dotButton;
let operand1;
let operand2;
let operator;


function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}
function modulus(a, b) {
    return a % b;
}



function pressAC() {
    displayElement.textContent = "";
    operator = undefined;
    enableDot(dotButton);
}
function result(answer) {
    if (isNaN(answer)) {
        alert("Input not in expected form.");
        pressAC();
    } else if (answer === Infinity) {
        alert("Divide by 0 is not allowed you idiot.");
        pressAC();
    }
    else {
        displayElement.textContent = answer;
        operator = undefined;
    }
}
function operate(operator, a, b) {
    switch(operator) {
        case '+':
                result(add(a, b));
                break;
        case '-':
                result(subtract(a, b));
                break;
        case '*':
                result(multiply(a, b));
                break;
        case '/':
                result(divide(a, b));
                break;
        case '%':
                result(modulus(a, b));
                break;
    }
}


buttonElement.forEach(button => button.addEventListener('click', clickFunction));

function enableDot(dotButton) {
    if (dotButton === undefined) {
        return;
    }
    dotButton.disabled = false;
    dotButton.classList.remove('disabled');
}

function clickFunction(e) {
    const textContent = e.target.textContent;
    if ((parseInt(textContent) >= 0 && parseInt(textContent) <= 9)) {
        displayElement.textContent += textContent;
    } else if (
                textContent == '+' || 
                textContent == '/' || 
                textContent == '*' || 
                textContent == '-' || 
                textContent == '%'
                ) {
        enableDot(dotButton);
        if (operator === undefined) {

            operand1 = parseFloat(displayElement.textContent);
            operator = textContent;

        } else {

            operand2 = parseFloat(displayElement.textContent.split(operand1+operator)[1]);
            operate(operator, operand1, operand2);    

            operator = textContent;
            operand1 = parseFloat(displayElement.textContent);
            
        }
        displayElement.textContent += textContent;

    } else if (textContent == '=') {

        operand2 = parseFloat(displayElement.textContent.split(operand1+operator)[1]);
        operate(operator, operand1, operand2);

    } else if (textContent == '<-') {

        let displayStr = displayElement.textContent;
        displayElement.textContent = displayStr.substring(0, displayStr.length - 1);

    } else if (textContent == ".") {

        dotButton = e.target;
        dotButton.disabled = true;
        dotButton.classList.add("disabled");
        displayElement.textContent += textContent;
        
    } else if (textContent == 'AC') {
        pressAC();
    }
}