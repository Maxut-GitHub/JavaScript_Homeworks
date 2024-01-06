"use strict";
let string = prompt("Введлите строку");

function vowersForEach(anyString) {
	let count = 0;
	let arrString = anyString.toLowerCase().split("");
	arrString.forEach((element) => {
		if ("ауоиэыяюеё".indexOf(element) > -1) {
			count++;
		}
	});
	return count;
}

function vowersFilter(anyString) {
	let arrString = anyString.toLowerCase().split("");
	let filterString = arrString.filter((element) =>
		"ауоиэыяюеё".includes(element)
	);
	return filterString.length;
}

function vowersReduse(anyString) {
	let arrString = anyString.toLowerCase().split("");
	function vowelsCount(count, element) {
		if ("ауоиэыяюеё".indexOf(element) > -1) {
			return ++count;
		} else return count;
	}
	return arrString.reduce(vowelsCount, 0);
}

alert(`
vowersForEach - ${vowersForEach(string)}
vowersFilter - ${vowersFilter(string)}
vowersReduse - ${vowersReduse(string)}
`);
