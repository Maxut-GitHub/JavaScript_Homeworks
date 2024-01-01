"use strict";

let array = [5, 7, [4, [2], 8, [1, 3], 2], [9, []], 1, 8];
alert(treeSum(array));

function treeSum(array) {
	let sum = 0;
	for (let el of array) {
		if (typeof el === "object") {
			sum += treeSum(el);
		} else {
			sum += el;
		}
	}
	return sum;
}
