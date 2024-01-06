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

function vowersForEach(anyString) {
	let count = 0;
	const vowels = "ауоиэыяюеё";
	let arrString = anyString.toLowerCase().split("");
	arrString.forEach((element) => {
		if (vowels.indexOf(element) > -1) {
			count++;
		}
	});
	return count;
}

function vowersFilter(anyString) {
	const vowels = "ауоиэыяюеё";
	let arrString = anyString.toLowerCase().split("");
	let filterString = arrString.filter(function (element) {
		if (vowels.indexOf(element) > -1) {
			return true;
		} else return false;
	});
	return filterString.length;
}

function vowersReduse(anyString) {}

alert(`
vowersForEach - ${vowersForEach(string)}
vowersFilter - ${vowersFilter(string)}
vowersReduse - ${vowersReduse(string)}
`);
