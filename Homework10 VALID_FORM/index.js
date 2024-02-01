"use strict";

//Создание красной ошибки (В аргумент передавать текст ошибки)
function createError(text) {
	let errorText = document.createElement(`p`);
	errorText.textContent = text;
	errorText.style.cssText = `color: red; margin-left: 20px;`;
	return errorText;
}

//Дал слушателя всем нужным элементам
let form = document.getElementsByTagName(`form`);
let el1 = form[0].elements.developers;
el1.addEventListener(`blur`, validDifficult);
let el2 = form[0].elements.siteName;
el2.addEventListener(`blur`, validSimple);
let el3 = form[0].elements.siteURL;
el3.addEventListener(`blur`, validSimple);
let el4 = form[0].elements.reliaseDate;
el4.addEventListener(`blur`, validSimple);
let el5 = form[0].elements.visitors;
el5.addEventListener(`blur`, validSimple);
let el6 = form[0].elements.email;
el6.addEventListener(`blur`, validSimple);
let el7 = form[0].elements.catalog;
el7.addEventListener(`click`, validSelect);
let el8 = document.getElementsByClassName(`radio`);
for (let el of el8) {
	el.addEventListener(`click`, validRadio);
}
//переменная для запоминания того, что выбрал пользователь в radio (нужно для кнопки submit)
let radioAnswer = 0;
let el9 = form[0].elements.votes;
el9.addEventListener(`click`, validСheckbox);
let el10 = form[0].elements.description;
el10.addEventListener(`blur`, validSimple);

//Проверка на пустоту, цифры и длину более 3 символов
function validDifficult(el) {
	let elementValue = el.target.value.trim();
	let parentEl = el.target.parentNode;
	let numbers = "0123456789";
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
	let parentEl = el.target.parentNode;
	//Удаление красной ошибки, если она найдена
	let errorEl = parentEl.getElementsByTagName(`p`);
	if (errorEl[0]) {
		parentEl.removeChild(errorEl[0]);
	}
	//Далее все проверки
	if (elementValue === "1") {
		parentEl.appendChild(createError("← к сожалению, недоступно"));
		return;
	}
}

//Проверка радио
function validRadio(el) {
	let elementValue = el.target.value;
	let parentEl = el.target.parentNode;
	//Сохранение результата
	radioAnswer = elementValue;
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

function submitButton() {
	let blurEvent = new Event(`blur`);
	let clickEvent = new Event(`click`);
	el1.dispatchEvent(blurEvent);
	el2.dispatchEvent(blurEvent);
	el3.dispatchEvent(blurEvent);
	el4.dispatchEvent(blurEvent);
	el5.dispatchEvent(blurEvent);
	el6.dispatchEvent(blurEvent);
	el7.dispatchEvent(clickEvent);
	if (radioAnswer === 0) {
		let parentEl = el8[0].parentNode;
		let errorEl = parentEl.getElementsByTagName(`p`);
		if (errorEl[0]) {
			parentEl.removeChild(errorEl[0]);
		}
		parentEl.appendChild(createError(`← вам нужно выбрать хоть что-то!`));
	}
	el9.dispatchEvent(clickEvent);
	el10.dispatchEvent(blurEvent);

	let form = document.getElementsByTagName(`form`);
	let findErrors = form[0].getElementsByTagName(`p`);
	//отмена отправки формы при нахождении ошибок (Все ошибки в форме имеют тег <p>). При отсутсвии ошибок - отправить форму.
	if (findErrors[0]) {
		form[0].addEventListener(`submit`, function (event) {
			event.preventDefault();
			//Ищется первая форм-группа с ошибкой, и применятеся focus() к инпуту в ней. Для select пришлось писать отдельно, тк. в ней нет инпута
			try {
				let inputElWithErrors =
					findErrors[0].parentNode.getElementsByTagName(`input`);
				inputElWithErrors[0].focus();
			} catch {
				let selectElWithErrors =
					findErrors[0].parentNode.getElementsByTagName(`select`);
				selectElWithErrors[0].focus();
			}
		});
	} else {
		form[0].submit();
	}
}

// Валидация такова:
// Разработчики: не пустая строка, без цифр, более трех символов
// Все остльные инпуты: не пустая строка.
// Рубрика каталога: не бытовая техника.
// Размещение: не бесплтаное.
// Резрешить отзывы: обязательно.
