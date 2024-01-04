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
		if (key in privateObject) {
			delete privateObject[key];
			return true;
		} else return false;
	};
	self.getKeys = function () {
		return Object.keys(privateObject);
	};
}

let drinkStorage = new ObjStorageFunc();

//сохранение напитка
function information_input() {
	let name = prompt("Название напитка:");
	if (!name) {
		alert("Имя не задано.");
		return;
	}
	let alcohol = confirm("Напиток алкогольный?\nОтмена - НЕТ\nОК - ДА");
	if (alcohol) {
		alcohol = "Алкогольный: Да";
	} else {
		alcohol = "Алкогольный: Нет";
	}
	let recipe = prompt(
		"Добавьте рецепт:\nОтмена - рецепт не нужен\nОК - сохранить рецепт"
	);
	if (recipe === null) {
		recipe = "Рецепт отсутствует.";
	} else {
		recipe = "Рецепт: " + recipe;
	}
	let information = { alcohol: alcohol, recipe: recipe };
	drinkStorage.addValue(name, information);
}

//отдать напиток
function information_give() {
	let name = prompt("Какой напиток найти?");
	let findName = drinkStorage.getValue(name);
	if (findName) {
		alert(
			"Напиток: " +
				name +
				"\n" +
				findName["alcohol"] +
				"\n" +
				findName["recipe"]
		);
	} else if (name) {
		alert("Не найдено");
	}
}

// удаление напитка
function information_delete() {
	let name = prompt("Какой напиток удалить?");
	if (drinkStorage.deleteValue(name)) {
		alert("удалено.");
	} else if (name) {
		alert("Не найдено");
	}
}

//Перечень напитков
function information_list() {
	let list = drinkStorage.getKeys();
	if (list.length != 0) {
		alert(list.join("\n"));
	} else {
		alert("Ни одного напитка не найдено.");
	}
	console.log(list);
}
