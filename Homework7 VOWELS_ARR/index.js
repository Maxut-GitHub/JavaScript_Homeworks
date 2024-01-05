"use strict";
let string = prompt("Введлите строку");

function vowers(anyString) {
	let count = 0;
	const vowels = "ауоиэыяюеё";
	for (let letter of anyString) {
		letter = letter.toLowerCase();
		if (vowels.indexOf(letter) > -1) {
			count++;
		}
	}
	return count;
}

alert("Гласных букв в строке: " + vowers(string));
