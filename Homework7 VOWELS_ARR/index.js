"use strict";
// let string = prompt("Введлите строку");
let string = "  ЫнДо  ФаьБ ол"; // 4

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

function vowersForEach(anyString) {}
function vowersFilter(anyString) {}
function vowersReduse(anyString) {}

alert(`
vowersForEach - ${vowersForEach(string)} 
vowersFilter - ${vowersFilter(string)} 
vowersReduse - ${vowersReduse(string)}
`);
