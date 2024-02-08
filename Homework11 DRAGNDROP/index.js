"use strict";

//координаты картинки
let imageX;
let imageY;

//координаты курсора
let cursorX;
let cursorY;

//Всего картинок (для z-index)
let imageCount = 0;

//Какой элемент сейчас тащится
let dragElement;

//координаты, где курсор взял картинку
let cursorDragX;
let cursorDragY;

//После полной загрузки страницы, нахожу картинку, даю слушателя mousedown, беру координаты картинки и делаю такие же значения для left/top
window.onload = function findImages() {
	let images = document.getElementsByTagName(`img`);
	for (let el of images) {
		el.addEventListener(`mousedown`, mousedownFunk);
		let coordinates = el.getBoundingClientRect();
		el.style.top = `${coordinates.y}px`;
		el.style.left = `${coordinates.x}px`;
	}
	//затем даю картинке абсолюную позицию и считаю кол-во картинок для z-index (На случай, если у каокй-нибудь картинки уже есть z-index вместо `auto`)
	for (let el of images) {
		el.style.position = `absolute`;
		imageCount++;
	}
};

//Запоминание Координат картинки и места взятия картинки, изменение курсора.
function mousedownFunk(event) {
	event = event || window.event;
	event.preventDefault();
	dragElement = event.currentTarget;

	//добавляю слушателей только при взятии
	window.addEventListener(`mousemove`, mousemoveFunk);
	window.addEventListener(`mouseup`, dropElementFunk);

	dragElement.style.zIndex = imageCount++;
	dragElement.style.cursor = `grab`;
	let coordinates = dragElement.getBoundingClientRect();
	imageX = coordinates.x;
	imageY = coordinates.y;
	cursorDragX = event.clientX;
	cursorDragY = event.clientY;
}

//прекратить тащить и поменять курсор на обычный. Использую при отпускании или при потере курсора
function dropElementFunk(event) {
	dragElement.style.cursor = `default`;
	console.log(`Элемент упал, эвент - ` + event.type);
	window.removeEventListener(`mousemove`, mousemoveFunk);
	window.removeEventListener(`mouseup`, dropElementFunk);
}

//Координаты картинки - координаты взятия картинки + координаты курсора сейчас = на сколько картинка переместилась.
function mousemoveFunk(event) {
	event = event || window.event;
	console.log(`сейчас функция реагирует на ` + event.type);
	cursorX = event.clientX;
	cursorY = event.clientY;
	dragElement.style.left = `${imageX - cursorDragX + cursorX}px`;
	dragElement.style.top = `${imageY - cursorDragY + cursorY}px`;
}
