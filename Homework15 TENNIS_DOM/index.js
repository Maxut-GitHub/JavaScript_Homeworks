"use strict";

//Скорость ракеток
const boardSpeed = 3;

//Скорость мяча
const ballSpeed = 3;

//Размер поля
const fieldWidth = 800;
const fieldHeight = 400;

function createGame() {
	//Функция для старта игры
	function start() {
		console.log(`Раунд начался!`)
		button.disabled = true;
		//мяч в центре
		ball.posX = fieldWidth / 2 - ball.width / 2;
		ball.posY = fieldHeight / 2 - ball.height / 2;
		//Обновление скорости мяча
		ball.speedX = ballSpeed;
		ball.speedY = ballSpeed;
		//Рандомное направление для мяча (4 различных направления) --- Math.round(Math.random()) дает 1 или 0. 
		if (Math.round(Math.random()) === 1) {
			ball.speedX = -ballSpeed;
		}
		if (Math.round(Math.random()) === 1) {
			ball.speedY = -ballSpeed;
		}
		//Старт таймера, если раундов еще небыло
		if (count.textContent === `0:0`) {
			setInterval(tick, 1000 / 60);
		}
	}
	//добавление элементов:
	let body = document.getElementsByTagName(`body`)[0];
	//кнопка старта
	let button = document.createElement(`button`);
	button.style.cssText = `width: 100px; height: 30px; margin: 0 0 20px 0; background-color: #d1d1d1;`
	button.textContent = `Старт!`;
	button.onclick = start;
	body.appendChild(button);
	//Поле
	let field = document.createElement(`div`);
	field.style.cssText = `width: ${fieldWidth}px; height: ${fieldHeight}px; background-color: #c4b352; border: solid; border-color: black; border-width: 2px; position: absolute`
	body.appendChild(field);
	//счет
	let count = document.createElement(`div`);
	let greenCount = 0;
	let blueCount = 0;
	count.style.cssText = `width: 100px; height: 50px; margin: 0 0 20px 0; position: absolute; left: 450px; top: 80px; font-size: 60px;
	display: flex; justify-content: center; `
	count.textContent = `0:0`;
	body.appendChild(count);

	//зеленая ракетка
	let greenBoard = {
		width: 10,
		height: 100,
		posY: 100,
		speedY: 0,
	}
	let greenBoardEl = document.createElement(`div`);
	greenBoardEl.style.cssText = `width: 10px; height: ${greenBoard.height}px; background-color: green; position: relative; top: ${fieldHeight / 2 - greenBoard.height}px`
	field.appendChild(greenBoardEl);

	//красная ракетка
	let blueBoard = {
		width: 10,
		height: 100,
		posY: 0,
		speedY: 0,
	}
	let blueBoardEl = document.createElement(`div`);
	blueBoardEl.style.cssText = `width: 10px; height: ${blueBoard.height}px; background-color: blue; position: relative; left: 786px; top: 0`
	field.appendChild(blueBoardEl);

	//Мяч
	let ball = {
		width: 40,
		height: 40,
		posY: 180,
		posX: 380,
		speedY: ballSpeed,
		speedX: ballSpeed,
	}
	let ballEl = document.createElement(`div`);
	ballEl.style.cssText = `width: 40px; height: 40px; background-color: red; border-radius: 50%; position: absolute; left: 380px; top: 180px;`
	field.appendChild(ballEl)

	//обновление позиции раз в тик
	function tick() {
		function update() {

			blueBoardEl.style.top = blueBoard.posY + blueBoard.speedY + `px`;
			blueBoard.posY = parseInt(blueBoardEl.style.top);

			greenBoardEl.style.top = greenBoard.posY + greenBoard.speedY + `px`;
			greenBoard.posY = parseInt(greenBoardEl.style.top);

			//Проверка на столкновение с границей поля (зеленая ракетка)
			if (greenBoard.posY > fieldHeight - greenBoard.height) {
				greenBoard.posY = (greenBoard.posY - (greenBoard.posY - (fieldHeight - greenBoard.height)) * boardSpeed)
			}
			if (greenBoard.posY < 0) {
				greenBoard.posY = 0
			}
			//Проверка на столкновение с границей поля (красная ракетка)
			if (blueBoard.posY > fieldHeight - blueBoard.height * 2) {
				blueBoard.posY = (blueBoard.posY - (blueBoard.posY - (fieldHeight - blueBoard.height * 2)) * boardSpeed)
			}
			if (blueBoard.posY < -blueBoard.height) {
				blueBoard.posY = -blueBoard.height
			}
			ballMove()
			// вылетел ли мяч ниже пола?
			if (ball.posY + ball.height > fieldHeight) {
				ball.speedY = -ball.speedY;
				ball.posY = fieldHeight - ball.height;
			}
			// вылетел ли мяч выше потолка?
			if (ball.posY < 0) {
				ball.speedY = -ball.speedY;
				ball.posY = 0;
			}

			// вылет в левую стенку
			if (ball.posX + ball.width > fieldWidth) {
				ball.speedX = 0
				ball.speedY = 0
				ball.posX = fieldWidth - ball.width;
				countUpdate(`blue`)
			}
			// вылет в правую стенку
			if (ball.posX < 0) {
				ball.speedX = 0
				ball.speedY = 0
				ball.posX = 0;
				countUpdate(`green`)
			}
		}

		update()
	}

	//добавление слушателей
	document.addEventListener(`keydown`, greenBoardMove);
	document.addEventListener(`keydown`, blueBoardMove);
	document.addEventListener(`keyup`, greenBoardStop);
	document.addEventListener(`keyup`, blueBoardStop);

	//Начало движения для ракеток
	function greenBoardMove(event) {
		if (event.code == `ShiftLeft`) {
			greenBoard.speedY = -boardSpeed;
		}
		if (event.code == `ControlLeft`) {
			greenBoard.speedY = boardSpeed;
		}
	}
	function blueBoardMove(event) {
		if (event.code == `ArrowUp`) {
			blueBoard.speedY = -boardSpeed;
		}
		if (event.code == `ArrowDown`) {
			blueBoard.speedY = boardSpeed;
		}
	}

	//остановка для ракеток
	function greenBoardStop(event) {
		if (event.code == `ShiftLeft`) {
			greenBoard.speedY = 0;
		}
		if (event.code == `ControlLeft`) {
			greenBoard.speedY = 0;
		}
	}
	function blueBoardStop(event) {
		if (event.code == `ArrowUp`) {
			blueBoard.speedY = 0;
		}
		if (event.code == `ArrowDown`) {
			blueBoard.speedY = 0;
		}
	}

	//Движение мяча
	function ballMove() {
		ballEl.style.left = ball.posX + ball.speedX + "px";
		ball.posX += ball.speedX;
		ballEl.style.top = ball.posY + ball.speedY + "px";
		ball.posY += ball.speedY;
	}

	//Подсчет очков
	function countUpdate(blueOrGreen) {
		button.disabled = false
		if (blueOrGreen === `blue`) {
			console.log(`%c`, `color: Lime`);
			count.textContent = `${greenCount}:${++blueCount}`
		} else if (blueOrGreen === `green`) {
			count.textContent = `${++greenCount}:${blueCount}`
		}
	}

}
createGame();