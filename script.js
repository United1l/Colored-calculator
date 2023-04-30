const container = document.querySelector('.container');
const displayBox = document.querySelector('.display');
const index = document.querySelector('#index');
const equalSign = document.getElementById('equalSign');
const titleColored = document.getElementById('titleColored');
let inputText = document.querySelectorAll('.inputDisplay');
let displayBoxElementsArray = displayBox.children;

for(var i = 0; i < inputText.length; i++) {
	inputText[i].addEventListener('click', (e) => {
		if (e.target.innerText == "AC") {
			const [index, ...operationElems] = displayBoxElementsArray;
			allClear(operationElems);
		} else if (e.target.innerText == "C") {
			const [index, ...operationElems] = displayBoxElementsArray;
			removeTextFromDisplay(operationElems[operationElems.length-1]);
		} else {
			appendTextToDisplay(e.target);
			setColor(container, 0.2);
			titleColored.style.color = randomRGB(0.8);
		}
	});
}

equalSign.addEventListener('click', (array) => {
	console.log(displayBoxElementsArray);
	const [index, ...operationElems] = displayBoxElementsArray;
	for (var i = 0; i < operationElems.length; i++) {
		switch(operationElems[i].innerText) {
		case '+':
			add(operationElems);
			break;
		case '-':
			subtract(operationElems);
			break;
		case '*':
			multiply(operationElems);
			break;
		case '/':
			divide(operationElems);
			break;
		case '^':
			power(operationElems);
			break;
		default:
			console.log(operationElems);
			break;				
		}
	}
}); 

window.onload = setInterval(() => indexToggle(index), 1000); 



let indexStatus = true;

 // Function to make Index toggle on and off after each second
function indexToggle(element) {
	if (indexStatus) {
		toggleDisplayOff(element);
		indexStatus = false;
	} else if (!indexStatus) {
		element.style.display = 'inline';
		indexStatus = true;
	} else {
		console.log('Output')
	}
	
}

// Addition function
function add(array) {
	let operator = "+";
	performOperation(operator, array);
}

// Subtraction function
function subtract(array) {	
	let operator = "-";
	performOperation(operator, array);
}

// Multiplication function
function multiply(array) {
	let operator = "*";
	performOperation(operator, array);
}

// Division function
function divide(array) {
	let operator = "/";
	performOperation(operator, array);	
}

// Power function
function power(array) {
	let operator = "^";
	performOperation(operator, array);
}

// Function that performs the calculator operation depending on which operator calls it
function performOperation(operator, array) {	
	var result;
	var resultNode;
	const operatorArgs = outputOperatorArgs(array);
	if (operator == "+") {
		result = operatorArgs[0] + operatorArgs[1];
	} else if (operator == "-") {
		result = operatorArgs[0] - operatorArgs[1];
	} else if (operator == "*") {
		result = operatorArgs[0] * operatorArgs[1];
	} else if (operator == "/") {
		result = operatorArgs[0] / operatorArgs[1];
	} else if (operator == "^") {
		result = operatorArgs[0] ** operatorArgs[1];
	} else {
		console.log(operatorArgs)
	}
	resultNode = createAddText(result);
	console.log(resultNode);
	allClear(array);
	appendTextToDisplay(resultNode);
}

// Function that outputs the numbers on the left and right side of the operator for processing
function outputOperatorArgs(array) {
	let newArray = array.slice(0, array.length - 1);
	console.log(newArray);
	const operatorArgs = getNumbers(newArray);
	let operatorNumbers = [parseElems(operatorArgs[0]), parseElems(operatorArgs[1])];
	return operatorNumbers;
	
}

// Function to get the numbers to be summed that are on the left and right of the operator
function getNumbers(array) {
	var leftNumbers;
	var rightNumbers;
	let numbersArray = [];
	let operatorArray = ["+","-","*","/","^",]
	for (var i = 0; i < array.length; i++) {
		for (var j = 0; j < operatorArray.length; j++) {
			if (array[i].innerText == operatorArray[j]) {
			const operatorIndex = array.indexOf(array[i]);
			leftNumbers = array.slice(0, operatorIndex);
			rightNumbers = array.slice((operatorIndex + 1), array.length);
			numbersArray.push(leftNumbers);
			numbersArray.push(rightNumbers);		
			} else{
				//Nothing
			}
		}
	}
	return numbersArray;
}


// Function that accepts any array as a parameter and converts all the array item to the number data type
function parseElems(array) {
	let stringArr = [];
	let combinedElem;
	for (var i = 0; i < array.length; i++) {
		stringArr.push(array[i].innerText);
	}
	if (stringArr.length > 0) {
		combinedElem = stringArr.join("");
	} else {
		console.log("loop not working")
	}
	const parsedElem = parseInt(combinedElem);

	return parsedElem;
}

// Function to create a p element node and append the result of an operation to the displaybox
function createAddText(element) {
	const pElement = document.createElement("p");
	const textNode = document.createTextNode(`${element}`);
	pElement.appendChild(textNode);
	return pElement;
}

// Function that removes all innerText connected to the display element
function removeTextFromDisplay(element) {
	displayBox.removeChild(element);
}

// Function that removes all nodes appended to the display box
function allClear(array) {
	for (var i = 0; i < array.length; i++) {
				removeTextFromDisplay(array[i]);
			}
}

// Function that appends innerText to the display element
function appendTextToDisplay(element) {
	const elementInnerHtml = element;
	const copyElement = elementInnerHtml.cloneNode(true);
	displayBox.appendChild(copyElement);
}

// Function that sets an element's background color to a random color
function setColor(element, alpha) {
	const tarGet = element;
	tarGet.style.backgroundColor = randomRGB(alpha);
}

// Function that turns an element's display off
function toggleDisplayOff(element) {
	return element.style.display = 'none';
}

// Function that returns a random color upon being invoked.
function randomRGB(alpha) {
	return `rgb(${randomNum()},${randomNum()},${randomNum()},${alpha})`;
}

// Function that returns a random number between 0 and 280
function randomNum() {
	return Math.floor(Math.random() * 280);
}
