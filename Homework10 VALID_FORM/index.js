"use strict";
let numbers = "0123456789";

//Создание красной ошибки (В аргумент передавать текст ошибки)
function createError(text) {
	let errorText = document.createElement(`p`);
	errorText.textContent = text;
	errorText.style.cssText = `color: red; margin-left: 20px;`;
	return errorText;
}

//Дал слушателя всем нужным элементам
{
	let el1 = document.getElementById(`developers`);
	el1.addEventListener(`blur`, validDifficult);

	let el2 = document.getElementById(`siteName`);
	el2.addEventListener(`blur`, validSimple);

	let el3 = document.getElementById(`siteURL`);
	el3.addEventListener(`blur`, validSimple);

	let el4 = document.getElementById(`reliaseDate`);
	el4.addEventListener(`blur`, validSimple);

	let el5 = document.getElementById(`visitors`);
	el5.addEventListener(`blur`, validSimple);

	let el6 = document.getElementById(`email`);
	el6.addEventListener(`blur`, validSimple);

	let el7 = document.getElementById(`catalog`);
	el7.addEventListener(`blur`, validSelect);

	let el8 = document.getElementsByClassName(`radio`);
	for (let el of el8) {
		el.addEventListener(`blur`, validRadio);
	}

	let el9 = document.getElementById(`votes`);
	el9.addEventListener(`blur`, validСheckbox);

	let el10 = document.getElementById(`description`);
	el10.addEventListener(`blur`, validSimple);
}

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

//Проверка списка
function validSelect(el) {
	let elementValue = el.target.value;
	console.log(elementValue);
	let parentEl = el.target.parentNode;
	//Удаление красной ошибки, если она найдена
	let errorEl = parentEl.getElementsByTagName(`p`);
	if (errorEl[0]) {
		parentEl.removeChild(errorEl[0]);
	}
	//Далее все проверки
	if (elementValue === "3") {
		parentEl.appendChild(createError("← к сожалению, недоступно"));
		return;
	}
}

//Проверка радио
function validRadio(el) {
	let elementValue = el.target.value;
	console.log(elementValue);
	let parentEl = el.target.parentNode;
	//Удаление красной ошибки, если она найдена
	let errorEl = parentEl.getElementsByTagName(`p`);
	if (errorEl[0]) {
		parentEl.removeChild(errorEl[0]);
	}
	//Далее все проверки
	if (elementValue === "1") {
		parentEl.appendChild(createError("← бесплатно нельзя!"));
		return;
	}
}

//Проверка чекбокса
function validСheckbox(el) {
	let parentEl = el.target.parentNode;
	//Удаление красной ошибки, если она найдена
	let errorEl = parentEl.getElementsByTagName(`p`);
	if (errorEl[0]) {
		parentEl.removeChild(errorEl[0]);
	}
	//Далее все проверки
	if (!el.target.checked) {
		parentEl.appendChild(createError("← Отзывы должны быть разрешены!"));
		return;
	}
}

//отмена отправки формы
let form = document.getElementsByTagName(`form`);
form[0].addEventListener(`submit`, function (event) {
	event.preventDefault();
});

function submitButton() {}
