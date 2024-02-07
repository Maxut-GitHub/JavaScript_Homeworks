"use strict";

//координаты картинки
let imageX;
let imageY;

//координаты курсора
let cursorX;
let cursorY;

//Всего картинок (z-index во время перетаскивания), newZIndex для еще не имеющий ZIndex элементов, currentZIndex - ZIndex текущено элемента.
let imageCount = 0;
let newZIndex = 1;
let currentZIndex;

//Всегда отслеживаю курсор
window.addEventListener(`mousemove`, mousemoveWindowFunk);
function mousemoveWindowFunk(event) {
	cursorX = event.clientX;
	cursorY = event.clientY;
}

//Какой элемент сейчас тащится
let dragElement;

//координаты, где курсор взял картинку
let cursorDragX;
let cursorDragY;

//После полной загрузки страницы, нахожу картинку, даю 4 слушателя, беру координаты картинки и делаю такие же значения для left/top
window.onload = function findImages() {
	let images = document.getElementsByTagName(`img`);
	for (let el of images) {
		el.addEventListener(`mousedown`, mousedownFunk);
		el.addEventListener(`mouseup`, dropElementFunk);
		el.addEventListener(`mousemove`, mousemoveFunk);
		el.addEventListener(`mouseout`, dropElementFunk);
		let coordinates = el.getBoundingClientRect();
		el.style.top = `${coordinates.y}px`;
		el.style.left = `${coordinates.x}px`;
	}
	//затем даю картинке абсолюную позицию и считаю кол-во картинок для z-index
	for (let el of images) {
		el.style.position = `absolute`;
		imageCount++;
	}
};
function mousedownFunk(event) {
	event = event || window.event;
	event.preventDefault();
	dragElement = event.currentTarget;

	if (window.getComputedStyle(dragElement).zIndex === `auto`) {
		dragElement.style.zIndex = newZIndex++;
	}
	currentZIndex = dragElement.style.zIndex;
	dragElement.style.zIndex = imageCount;
	let coordinates = dragElement.getBoundingClientRect();
	imageX = coordinates.x;
	imageY = coordinates.y;
	cursorDragX = cursorX;
	cursorDragY = cursorY;

	//проверка (ПОТОМ УБРАТЬ)
	console.log(`КАРТИНКА Х= ` + imageX + ` Y= ` + imageY);
	console.log(`КУРСОР   X= ` + cursorX + " Y= " + cursorY);
}

//прекратить тащить. Использую при отпускании или при потере курсора
function dropElementFunk() {
	if (dragElement) {
		dragElement.style.zIndex = currentZIndex;
	}
	dragElement = undefined;
}

//Координаты картинки - координаты взятия картинки + координаты курсора сейчас = на сколько картинка переместилась.
function mousemoveFunk(event) {
	if (dragElement) {
		dragElement.style.left = `${imageX - cursorDragX + cursorX}px`;
		dragElement.style.top = `${imageY - cursorDragY + cursorY}px`;
	}
}
