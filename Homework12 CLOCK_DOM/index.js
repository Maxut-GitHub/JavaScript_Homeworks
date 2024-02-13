"use strict";
setInterval(currentTime, 1000);

function createWatch() {
	let el = document.getElementById(`clock-create`);
	if (el.value >= 200 && el.value <= 800) {
		//Убираем поле с кнопкой
		let form = document.getElementsByClassName(`for-clock`)[0];
		form.style.display = `none`;
		//2.4 - чем большн, тем больше расстояние до центра
		const radius = parseFloat(el.value / 2.4);
		//Создание желтого круга и добавление на экран.
		let yellowCircle = document.createElement(`div`);
		yellowCircle.style.cssText = `position: absolute; border-radius: 50%; background-color: goldenrod; width: ${el.value}px; height: ${el.value}px;`;
		let body = document.getElementsByTagName(`body`)[0];
		body.appendChild(yellowCircle);
		//находим центр желтого круга
		const yellowCenterX =
			yellowCircle.offsetLeft + yellowCircle.offsetWidth / 2;
		const yellowCenterY =
			yellowCircle.offsetTop + yellowCircle.offsetHeight / 2;
		//Кол-во градусов для расчета угла и текущий угол
		let degreesСounter = 30;
		let angle = 30;
		//Создание зеленых кругов.
		for (let i = 1; i <= 12; i++) {
			let greenCircle = document.createElement(`div`);
			body.appendChild(greenCircle);
			greenCircle.style.cssText = `position: absolute;
			width: ${el.value / 10}px;
			height: ${el.value / 10}px;
			border-radius: 50%; background-color: seagreen; display: flex; justify-content: center; 
			font-size: ${el.value / 12}px;`;
			greenCircle.innerHTML = i;
			//Считаем угол и прибавляем 30 градусов для слудующего зеленого круга
			angle = (parseFloat(degreesСounter) / 180) * Math.PI;
			degreesСounter += 30;
			//позиционируем зеленый круг
			const greenCircleCenterX = yellowCenterX + radius * Math.sin(angle);
			const greenCircleCenterY = yellowCenterY - radius * Math.cos(angle);
			greenCircle.style.left =
				Math.round(greenCircleCenterX - greenCircle.offsetWidth / 2) + `px`;
			greenCircle.style.top =
				Math.round(greenCircleCenterY - greenCircle.offsetHeight / 2) + `px`;


		}
		//Присоединение счетчика времени к часам
		yellowCircle.appendChild(middleTime);
		middleTime.style.cssText = `position: absolute; left: ${yellowCircle.offsetWidth / 3.5}px; top: ${yellowCircle.offsetHeight / 4}px; font-size: ${el.value / 9}px; background-color: goldenrod;`
	}
}

//Время посередине часов
let middleTime = document.createElement(`div`);
function currentTime() {
	let data = new Date();
	middleTime.innerHTML = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`
}

