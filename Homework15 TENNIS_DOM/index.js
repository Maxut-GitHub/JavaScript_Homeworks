"use strict";

//Скорость ракеток
const boardSpeed = 3;

//Размер поля
const fieldWidth = 800;
const fieldHeight = 400;

//Размер ракеток
const BoardSize = 100;


function startGame() {
	//60 фпс
	setInterval(tick, 1000 / 60);
	//добавление элементов:
	let body = document.getElementsByTagName(`body`)[0];
	//кнопка старта
	let button = document.createElement(`button`);
	button.style.cssText = `width: 100px; height: 30px; margin: 0 0 20px 0; background-color: #d1d1d1;`
	button.textContent = `Старт!`;
	body.appendChild(button);
	//Поле
	let field = document.createElement(`div`);
	field.style.cssText = `width: ${fieldWidth}px; height: ${fieldHeight}px; background-color: #c4b352; border: solid; border-color: black; border-width: 2px`
	body.appendChild(field);
	//счет
	let count = document.createElement(`div`);
	count.style.cssText = `width: 100px; height: 50px; margin: 0 0 20px 0; position: absolute; left: 450px; top: 80px; font-size: 60px;
	display: flex; justify-content: center; `
	count.textContent = `0:0`;
	body.appendChild(count);

	//зеленая ракетка (и ее статус)
	let greenBoard = document.createElement(`div`);
	greenBoard.id = `greenBoard`
	greenBoard.style.cssText = `width: 10px; height: ${BoardSize}px; background-color: green; position: relative;`
	let greenBoardStatus = {
		posY: 100,
		speedY: 0,
	}
	field.appendChild(greenBoard);
	//красная ракетка (и ее статус)
	let redBoard = document.createElement(`div`);
	redBoard.id = `redBoard`
	redBoard.style.cssText = `width: 10px; height: ${BoardSize}px; background-color: red; position: relative; left: 786px; top: 0`
	let redBoardStatus = {
		posY: 0,
		speedY: 0,
	}
	field.appendChild(redBoard);

	//обновление позиции раз в тик
	function tick() {
		function update() {

			redBoard.style.top = redBoardStatus.posY + redBoardStatus.speedY + `px`;
			redBoardStatus.posY = parseInt(redBoard.style.top);

			greenBoard.style.top = greenBoardStatus.posY + greenBoardStatus.speedY + `px`;
			greenBoardStatus.posY = parseInt(greenBoard.style.top);

			//Проверка на столкновение с границей поля (зеленая ракетка)
			if (greenBoardStatus.posY > fieldHeight - BoardSize) {
				greenBoardStatus.posY = (greenBoardStatus.posY - (greenBoardStatus.posY - (fieldHeight - BoardSize)) * boardSpeed)
			}
			if (greenBoardStatus.posY < 0) {
				greenBoardStatus.posY = 0
			}
			//Проверка на столкновение с границей поля (красная ракетка)
			if (redBoardStatus.posY > fieldHeight - BoardSize * 2) {
				redBoardStatus.posY = (redBoardStatus.posY - (redBoardStatus.posY - (fieldHeight - BoardSize * 2)) * boardSpeed)
			}
			if (redBoardStatus.posY < -BoardSize) {
				redBoardStatus.posY = -BoardSize
			}
		}

		update()
	}

	//добавление слушателей
	document.addEventListener(`keydown`, greenBoardMove);
	document.addEventListener(`keydown`, redBoardMove);
	document.addEventListener(`keyup`, greenBoardStop);
	document.addEventListener(`keyup`, redBoardStop);

	//Начало движения для ракеток
	function greenBoardMove(event) {
		if (event.code == `ShiftLeft`) {
			greenBoardStatus.speedY = -boardSpeed;
		}
		if (event.code == `ControlLeft`) {
			greenBoardStatus.speedY = boardSpeed;
		}
	}
	function redBoardMove(event) {
		if (event.code == `ArrowUp`) {
			redBoardStatus.speedY = -boardSpeed;
		}
		if (event.code == `ArrowDown`) {
			redBoardStatus.speedY = boardSpeed;
		}
	}

	//остановка для ракеток
	function greenBoardStop(event) {
		if (event.code == `ShiftLeft`) {
			greenBoardStatus.speedY = 0;
		}
		if (event.code == `ControlLeft`) {
			greenBoardStatus.speedY = 0;
		}
	}
	function redBoardStop(event) {
		if (event.code == `ArrowUp`) {
			redBoardStatus.speedY = 0;
		}
		if (event.code == `ArrowDown`) {
			redBoardStatus.speedY = 0;
		}
	}


}
startGame();