"use strict";

function ObjStorageFunc() {
	const self = this;
	let privateObject = {};
	self.addValue = function (key, value) {
		privateObject[key] = value;
	};
	self.getValue = function (key) {
		return privateObject[key];
	};
	self.deleteValue = function (key) {
		if (privateObject[key]) {
			delete privateObject[key];
			return true;
		} else return false;
	};
	self.getKeys = function () {
		return Object.keys(privateObject);
	};
}

let drinkStorage = new ObjStorageFunc();

drinkStorage.addValue("Напиточек", "Вкусный очень"); // сохранение

console.log(drinkStorage.getValue("Напиточек")); //отдать значение

console.log(drinkStorage.deleteValue("Напиточек")); //удаление - true
console.log(drinkStorage.deleteValue("Напиточек")); //удаление несуществующего напитка - false

drinkStorage.addValue("Напиточек", "Вкусный очень"); // сохранение двух напитков
drinkStorage.addValue("Водичка", "Обычная");
console.log(drinkStorage.getKeys()); // возврат ключей
