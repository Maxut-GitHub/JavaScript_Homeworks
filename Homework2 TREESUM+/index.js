"use strict";
let string = prompt("Введите строку");

function noSpaces(string) {
	let countFirst = 0;
	let countLast = 0;

	//считаем пробелы в начале
	for (let i = 0; i < string.length; i++) {
		if (string[i] === " ") {
			countFirst++;
		} else {
			break;
		}
	}

	//считаем пробелы в конце
	for (let i = string.length - 1; i > 0; i--) {
		if (string[i] === " ") {
			countLast++;
		} else {
			break;
		}
	}
	return string.substring(countFirst, string.length - countLast);
}

alert("@" + noSpaces(string) + "@");
