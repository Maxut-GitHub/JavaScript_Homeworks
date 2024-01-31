"use strict";
let numbers = "0123456789";

//Создание красной ошибки (В аргумент передавать текст ошибки)
function createError(text) {
	let errorText = document.createElement(`p`);
	errorText.textContent = text;
	errorText.style.cssText = `color: red; margin-left: 20px;`;
	return errorText;
}

let el1 = document.getElementById(`developers`);
el1.addEventListener(`blur`, validDifficult);

let el2 = document.getElementById(`siteName`);
el2.addEventListener(`blur`, validSimple);

let el3 = document.getElementById(`siteURL`);
el3.addEventListener(`blur`, validSimple);

//Проверка на пустоту, цифры и длину более 3 символов
function validDifficult(el) {
	let elementValue = el.target.value.trim();
	let parentEl = el.target.parentNode;
	//Удаление красной ошибки, если она найдена
	let errorEl = parentEl.getElementsByTagName(`p`);
	if (errorEl[0]) {
		parentEl.removeChild(errorEl[0]);
	}
	//Далее все проверки
	if (elementValue === "") {
		parentEl.appendChild(createError("← пусто!"));
		return;
	}
	for (let letter of elementValue) {
		if (numbers.indexOf(letter) > -1) {
			parentEl.appendChild(createError("← Не должно содержать цифр!"));
			return;
		}
	}
	if (elementValue.length <= 3) {
		parentEl.appendChild(createError("← Нужно больше трех символов!"));
		return;
	}
}

//Проверка на пустоту
function validSimple(el) {
	let elementValue = el.target.value.trim();
	let parentEl = el.target.parentNode;
	//Удаление красной ошибки, если она найдена
	let errorEl = parentEl.getElementsByTagName(`p`);
	if (errorEl[0]) {
		parentEl.removeChild(errorEl[0]);
	}
	//Далее все проверки
	if (elementValue === "") {
		parentEl.appendChild(createError("← пусто!"));
		return;
	}
}
