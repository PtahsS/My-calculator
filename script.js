
// Made by Ptashenchuk Serhii


const display = document.getElementById('display');
let num1 = "";
let num2 = "";
let operator = "";
let result = null;


// Input value
function input(inputValue) {

	if (operator == "") {				//First symbol checking and adding to num1
		if (result != ""){
			result = "";
			num1 = "";
		}
			num1 = checkZerosBeforeNumber(num1);
		if (checkLengthOfNum(num1)) {
			num1 = addSymbol(num1, inputValue);
		};
		num1 = checkDotsBeforeNumber(num1);
		display.value = num1;
	} else	{							// Second symbol checking and adding to num2
		num2 = checkZerosBeforeNumber(num2);
		if (checkLengthOfNum(num2)) {
			num2 = addSymbol(num2, inputValue);
		};
		num2 = checkDotsBeforeNumber(num2);
		display.value = num2;
	}
	console.log("num1 " + num1);
	console.log("operator "+ operator);
	console.log("num2 " + num2);
	console.log("result " + result);
}

// There are have not to be zeros before number
function checkZerosBeforeNumber(num){
	if (num[0] == 0 && num[1] != ".") {return num.substr(1)} else return num;
}

// String length has to be no more 20 symbols
function checkLengthOfNum(value){
	return (value.length <= 20);
}

// Add Symbol to num1 or to num2
function addSymbol(numX, inputValue) {
	return numX+inputValue;
}

// There are no more than 1 dot in the line, the rest are cut off 
function checkDotsBeforeNumber(num){
	let temp = num.split(".").length-1;
	if (temp>1) {
		return  num.substring(0, num.length-1);
	} 
	// Set "0" before dot
	if (num[0] == '.') {
		num = "0" + num;
	}
	return num;
}

//A float number has not to contain last zero after dot
// function parseNum(num) {
// 	return num
// }

// If conditions allow, the function calculate to calculate the result. Retains operand.
function operation (symbol){
	if(operator != "" && num2 != ""){
		calculate();
	} else{
		display.value = num1 = +num1
	}
	operator = symbol;
	console.log("num1 " + num1);
	console.log("operator "+ operator);
	console.log("num2 " + num2);
	console.log("result " + result);
}

// Calculate result function. Operator and num2 cleaning
function calculate () {
	if (num1 == "" && num2 == "") {
		result == "0";
	} 
	else if (num1==0){result = num2}
	else if (num2==0){result = num1}
	else{
		result = eval(num1 + operator + num2);
		if (isFinite(result) && !isNaN(result)){
			num1 = String(result);
			display.value = num1 = Math.round(num1*1000000000)/1000000000;
		} else {
			display.value = "ERROR"
		}
	}
	num2 = operator = "";
	console.log("num1 " + num1);
	console.log("operator "+ operator);
	console.log("num2 " + num2);
	console.log("result " + result);
}

// Filter of variables for cleaning
function clr() {
	if(num2 != ""){
		num2 = "";
	} else {
		num1 = num2 = "";
	}
	display.value = "";
}

// Cleaning of last symbol of valiable num1 or num2
function back() {
	if (num2 != ""){
		display.value = num2 = num2.substring(0, num2.length-1);
	} else if (num1 != "" && result == ""){
		display.value = num1 = num1.substring(0, num1.length-1);
		}
	}
	
// Connecting keyboard input
document.addEventListener('keydown', keyDownHandler);
function keyDownHandler(event) {
	if (event.key >=0 && event.key < 10) {
		input(event.key);
	}
	switch (event.key){
		case "-": 
			operation("-");
			break;
		case "+": 
			operation("+");
			break;
		case "*": 
			operation("*");
			break;
		case "/": 
			operation("/");
			break;
		case ("Enter"): 
			calculate();
			break;
		case ("="): 
			equal();
			break;
		case ("."): 
			input(".");
			break;
		case ("Backspace"): 
			back();
			break;
	}
}