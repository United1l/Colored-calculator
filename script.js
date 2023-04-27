const container = document.querySelector('.container');
const displayBox = document.querySelector('.display');
const index = document.querySelector('#index');
const equalSign = document.getElementById('equalSign');
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
			setColor(container);
		}
	});
}

equalSign.addEventListener('click', (displayBoxElementsArray) => {
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
	var result;
	for (var i = 0; i < array.length; i++) {
		if (array[i].innerText == "+") {
			const rightOperators = getRightElem(array[i], array);
			const leftOperators = getLeftElem(array[i], array);
			result = (parseElems(leftOperators) + parseElems(rightOperators)).toString();
		} else {
			console.log(array)
		}
	}
	console.log(result);
	allClear(array);
	appendTextToDisplay(result);
}

// Subtraction function
function subtract(array) {
	
}

// Multiplication function
function multiply(array) {
	
}

// Division function
function divide(array) {
	
}

// Power function
function power(array) {
	
}

// Function that gets element elements on the right-side of an operator.
function getRightElem(element, array) {
	const [element, ...rightOperators] = array;
	return rightOperators;
}

// Function that gets elements on the left-side of an operator.
function getLeftElem(elem, array) {
	const [elem, ...leftOperators] = array.reverse();
	return leftOperators;
}


// Function that accepts any array as a parameter and converts all the array item to the number data type.
function parseElems(array) {
	let parsedOperators = [];
	for (var i = 0; i < array.length; i++) {
		let parsedElem = parseInt(array[i]);
		parsedOperators = [...parsedOperators, parsedElem];
	}

	return parsedOperators;
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
function setColor(element) {
	const tarGet = element;
	tarGet.style.backgroundColor = randomRGB();
}

// Function that turns an element's display off
function toggleDisplayOff(element) {
	return element.style.display = 'none';
}

// Function that returns a random color upon being invoked.
function randomRGB() {
	return `rgb(${randomNum()},${randomNum()},${randomNum()},0.4)`;
}

// Function that returns a random number between 0 and 280.
function randomNum() {
	return Math.floor(Math.random() * 280);
}
