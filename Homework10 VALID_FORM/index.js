"use strict";
let numbers = "0123456789";
let errorText = document.createElement(`p`);
errorText.textContent = `← ошибка (БЕЗ УКАЗАНИЯ ПРИЧИНЫ)`;
errorText.style.cssText = `color: red; margin-left: 20px;`;

function validDevelopers() {
	let element = document.getElementById(`developers`);
	let elementValue = element.value.trim();
	let parentEl = element.parentNode;

	if (elementValue === "") {
		errorText.textContent = "← пусто!";
		parentEl.appendChild(errorText);
		return;
	}
	for (let letter of elementValue) {
		if (numbers.indexOf(letter) > -1) {
			errorText.textContent = "← Не должно содержать цифр!";
			parentEl.appendChild(errorText);
			return;
		}
	}
	if (elementValue.length <= 3) {
		errorText.textContent = "← Нужно больше трех символов!";
		parentEl.appendChild(errorText);
		return;
	}
	if (parentEl.contains(errorText)) {
		parentEl.removeChild(errorText);
	}
}
