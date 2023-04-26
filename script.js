const container = document.querySelector('.container');
const displayBox = document.querySelector('.display');
const index = document.querySelector('#index');
const allClearKey = document.getElementById('allClear');
const clearKey = document.getElementById('clear');
const equalSign = document.getElementById('equalSign');
let inputText = document.querySelectorAll('.inputDisplay');
let displayBoxElementsArray = displayBox.children;

for(var i = 0; i < inputText.length; i++) {
	inputText[i].addEventListener('click', (e) => {
		if (inputText[i].innerHTML == "AC") {
			displayBoxElementsArray = [];
			console.log(displayBoxElementsArray)
		}
	appendTextToDisplay(e.target);
	setColor(container);
	})
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
		//some code;
		break;				
		}

		console.log(operationElems);
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
