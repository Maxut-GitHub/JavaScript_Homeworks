"use strict";

//Расстояние цифр часов до центра
const numberDistance = 2.4
//Цвет часов
const clockColor = `goldenrod`;
//Цвет фона для цифр
const numberCircleColor = `seagreen`;
//Цвет стрелок
const arrowColor = `black`;

function createWatch() {
	let el = document.getElementById(`clock-create`);
	if (el.value >= 200 && el.value <= 800) {
		//Убираем поле с кнопкой
		let form = document.getElementsByClassName(`for-clock`)[0];
		form.style.display = `none`;
		const radius = parseFloat(el.value / numberDistance);

		// Создаем Canvas часы и добавляем на страницу 
		let canvasClock = document.createElement(`canvas`);
		document.getElementsByTagName(`body`)[0].appendChild(canvasClock);
		canvasClock.setAttribute(`width`, el.value);
		canvasClock.setAttribute(`height`, el.value);
		//Желтый круг для часов
		let ctx = canvasClock.getContext("2d");
		ctx.beginPath();
		ctx.arc(el.value / 2, el.value / 2, el.value / 2, 0, Math.PI * 2, false);
		ctx.fillStyle = clockColor;
		ctx.fill();
		ctx.closePath();
		//находим центр желтого круга
		const yellowCenterX = canvasClock.getBoundingClientRect().left + el.value / 2;
		const yellowCenterY = canvasClock.getBoundingClientRect().left + el.value / 2;
		//Кол-во градусов для расчета угла и текущий угол
		let degreesСounter = 30;
		let angle = 30;
		//Создание зеленых кругов.
		for (let i = 1; i <= 12; i++) {
			//Считаем угол и прибавляем 30 градусов для слудующего зеленого круга
			angle = (parseFloat(degreesСounter) / 180) * Math.PI;
			degreesСounter += 30;
			//ищем центр зеленого круга и рисуем его
			const greenCircleCenterX = Math.round(yellowCenterX + radius * Math.sin(angle));
			const greenCircleCenterY = Math.round(yellowCenterY - radius * Math.cos(angle));
			ctx.beginPath();
			ctx.arc(greenCircleCenterX, greenCircleCenterY, el.value / 18, 0, Math.PI * 2, false);
			ctx.fillStyle = numberCircleColor;
			ctx.fill();
			ctx.closePath();

			//Создание текста (цифр)
			ctx.beginPath();
			ctx.fillStyle = `black`;
			ctx.font = `${el.value / 18}px serif`;
			//Позиция для цифр ОДНОЗНАЧНЫХ 1-9
			const positionFor1_9_X = greenCircleCenterX - el.value / 70;
			const positionFor1_9_Y = greenCircleCenterY + el.value / 70;
			//Позиция для цифр ДВУХЗНАЧНЫХ 10-12
			const positionFor10_12_X = greenCircleCenterX - el.value / 40;
			const positionFor10_12_Y = greenCircleCenterY + el.value / 70;
			if (i <= 9) {
				ctx.fillText(i, positionFor1_9_X, positionFor1_9_Y);
			} else {
				ctx.fillText(i, positionFor10_12_X, positionFor10_12_Y);
			}
			ctx.closePath();
		}




	}
}
createWatch()