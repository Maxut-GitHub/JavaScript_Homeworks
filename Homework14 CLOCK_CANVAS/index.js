"use strict";

//Расстояние цифр часов до центра
const numberDistance = 2.4
//Цвет часов
const clockColor = `goldenrod`;
//Цвет фона для цифр
const numberCircleColor = `seagreen`;
//Цвет стрелок
const arrowColor = `black`;
//Длина секундной стрелки
const secondArrowSize = 0.9;
//Длина минутной стрелки
const minuteArrowSize = 0.75;
//Длина часовой стрелки
const hourArrowSize = 0.45;


function createWatch() {
	let el = document.getElementById(`clock-create`);
	if (el.value >= 200 && el.value <= 800) {
		setInterval(currentTime, 1000);
		//Убираем поле с кнопкой
		let form = document.getElementsByClassName(`for-clock`)[0];
		form.style.display = `none`;
		currentTime()
		function currentTime() {
			//Удаляем старые часы
			if (document.getElementsByTagName(`canvas`)[0]) {
				document.getElementsByTagName(`canvas`)[0].remove()
			}
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
			//находим центр желтого круга
			const clockCenterX = canvasClock.getBoundingClientRect().left + el.value / 2;
			const clockCenterY = canvasClock.getBoundingClientRect().left + el.value / 2;
			//Кол-во градусов для расчета угла и текущий угол
			let degreesСounter = 30;
			let angle = 30;
			//Создание зеленых кругов.
			const radius = parseFloat(el.value / numberDistance);
			for (let i = 1; i <= 12; i++) {
				//Считаем угол и прибавляем 30 градусов для слудующего зеленого круга
				angle = (parseFloat(degreesСounter) / 180) * Math.PI;
				degreesСounter += 30;
				//ищем центр зеленого круга и рисуем его
				const greenCircleCenterX = Math.round(clockCenterX + radius * Math.sin(angle));
				const greenCircleCenterY = Math.round(clockCenterY - radius * Math.cos(angle));
				ctx.beginPath();
				ctx.arc(greenCircleCenterX, greenCircleCenterY, el.value / 18, 0, Math.PI * 2, false);
				ctx.fillStyle = numberCircleColor;
				ctx.fill();
				//Создание текста (цифр)
				ctx.fillStyle = `black`;
				ctx.font = `${el.value / 18}px serif`;
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText(i, greenCircleCenterX, greenCircleCenterY);
			}
			//---------------------------------- СТРЕЛКИ ----------------------------------------------------------------
			let data = new Date();
			console.log(data)
			ctx.globalAlpha = 0.7;
			ctx.strokeStyle = arrowColor;
			ctx.lineCap = 'round';
			//Секундная стрелка
			const secondAngleTime = (parseFloat(data.getSeconds() * 6) / 180) * Math.PI;
			let ArrowX = clockCenterX + (el.value / 2 * secondArrowSize) * Math.sin(secondAngleTime);
			let ArrowY = clockCenterY - (el.value / 2 * secondArrowSize) * Math.cos(secondAngleTime);
			ctx.beginPath();
			ctx.lineWidth = el.value / 200
			ctx.moveTo(clockCenterX, clockCenterY);
			ctx.lineTo(ArrowX, ArrowY)
			ctx.stroke();
			//Минутная стрелка
			const minuteAngleTime = (parseFloat(data.getMinutes() * 6) / 180) * Math.PI;
			ArrowX = clockCenterX + (el.value / 2 * minuteArrowSize) * Math.sin(minuteAngleTime);
			ArrowY = clockCenterY - (el.value / 2 * minuteArrowSize) * Math.cos(minuteAngleTime);
			ctx.beginPath();
			ctx.lineWidth = el.value / 90
			ctx.moveTo(clockCenterX, clockCenterY);
			ctx.lineTo(ArrowX, ArrowY);
			ctx.stroke();
			//Часовая стрелка
			const hourAngleTime = (parseFloat(data.getHours() * 30) / 180 + (data.getMinutes() * 0.5) / 180) * Math.PI;
			ArrowX = clockCenterX + (el.value / 2 * hourArrowSize) * Math.sin(hourAngleTime);
			ArrowY = clockCenterY - (el.value / 2 * hourArrowSize) * Math.cos(hourAngleTime);
			ctx.beginPath();
			ctx.lineWidth = el.value / 40
			ctx.moveTo(clockCenterX, clockCenterY);
			ctx.lineTo(ArrowX, ArrowY);
			ctx.stroke();
			ctx.closePath();
			//счетчик времени
			ctx.font = `${el.value / 10}px serif`;
			ctx.globalAlpha = 1;
			ctx.fillText(`${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`, clockCenterX, clockCenterY / 100 * 60);
		}
	}
}
createWatch()