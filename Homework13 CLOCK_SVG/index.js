"use strict";

//Расстояние цифр часов до центра
const numberDistance = 2.4;
//Цвет часов
const clockColor = `goldenrod`;
//Цвет фона для цифр
const numberCircleColor = `seagreen`;
//Цвет стрелок
const arrowColor = `black`;
//Массив стрелок
let arrows;

function createWatch() {
	let el = document.getElementById(`clock-create`);
	if (el.value >= 200 && el.value <= 800) {
		//Убираем поле с кнопкой 
		let form = document.getElementsByClassName(`for-clock`)[0];
		form.style.display = `none`;
		const radius = parseFloat(el.value / numberDistance);
		//Создаем часы (убираем display:none для svg)
		let SVGclock = document.getElementsByTagName(`svg`)[0];
		SVGclock.classList = `clock`;
		SVGclock.style.display = `block`;
		SVGclock.setAttribute(`width`, el.value)
		SVGclock.setAttribute(`height`, el.value)
		//Желтый круг для часов
		let yellowCircle = document.createElementNS("http://www.w3.org/2000/svg", 'ellipse');
		yellowCircle.setAttribute("fill", `${clockColor}`);
		yellowCircle.setAttribute("rx", el.value / 2);
		yellowCircle.setAttribute("ry", el.value / 2);
		yellowCircle.setAttribute("cx", el.value / 2);
		yellowCircle.setAttribute("cy", el.value / 2);
		SVGclock.appendChild(yellowCircle);
		//находим центр желтого круга
		const yellowCenterX = yellowCircle.getBoundingClientRect().left + el.value / 2;
		const yellowCenterY = yellowCircle.getBoundingClientRect().left + el.value / 2;
		//Кол-во градусов для расчета угла и текущий угол
		let degreesСounter = 30;
		let angle = 30;
		//Создание зеленых кругов.
		for (let i = 1; i <= 12; i++) {
			let greenCircle = document.createElementNS("http://www.w3.org/2000/svg", 'ellipse');
			SVGclock.appendChild(greenCircle);
			greenCircle.setAttribute("fill", `${numberCircleColor}`);
			greenCircle.setAttribute("rx", Math.round(el.value / 18));
			greenCircle.setAttribute("ry", Math.round(el.value / 18));
			//Считаем угол и прибавляем 30 градусов для слудующего зеленого круга
			angle = (parseFloat(degreesСounter) / 180) * Math.PI;
			degreesСounter += 30;
			//позиционируем зеленый круг
			const greenCircleCenterX = yellowCenterX + radius * Math.sin(angle);
			const greenCircleCenterY = yellowCenterY - radius * Math.cos(angle);
			greenCircle.setAttribute(`cx`, Math.round(greenCircleCenterX));
			greenCircle.setAttribute(`cy`, Math.round(greenCircleCenterY));
			//Создание текста (цифр)
			let greenNumber = document.createElementNS("http://www.w3.org/2000/svg", 'text');
			greenNumber.textContent = i;
			SVGclock.appendChild(greenNumber);
			greenNumber.style.fontSize = `${el.value / 18}`;
			//Центрируем цифры
			greenNumber.setAttribute(`x`, Math.round(greenCircleCenterX - (greenNumber.getBoundingClientRect().width / 2)));
			greenNumber.setAttribute(`y`, Math.round(greenCircleCenterY + (greenNumber.getBoundingClientRect().height * 0.2)));
		}

		//---------------------------------- СТРЕЛКИ ----------------------------------------------------------------
		//Каждая стрелка спозиционирована в центре SVG.
		//Секундная стрелка
		let secondArrow = document.createElementNS("http://www.w3.org/2000/svg", 'line');
		secondArrow.classList = `arrow`;
		secondArrow.style.transformOrigin = `${yellowCenterX}px`
		secondArrow.style.transform = `rotate(0)`
		secondArrow.setAttribute("stroke", `black`);
		secondArrow.setAttribute("stroke-opacity", 0.7);
		secondArrow.setAttribute("stroke-width", yellowCircle.getBoundingClientRect().width / 200);
		secondArrow.setAttribute("stroke-linecap", `round`);
		secondArrow.setAttribute("x1", yellowCenterX);
		secondArrow.setAttribute("y1", yellowCenterY * 1.05) + `px`;
		secondArrow.setAttribute("x2", yellowCenterX);
		secondArrow.setAttribute("y2", yellowCenterY - (yellowCircle.getBoundingClientRect().height / 2.2));
		SVGclock.appendChild(secondArrow)
		//Минутная стрелка
		let minuteArrow = document.createElementNS("http://www.w3.org/2000/svg", 'line');
		minuteArrow.classList = `arrow`;
		minuteArrow.style.transformOrigin = `${yellowCenterX}px`
		minuteArrow.setAttribute("stroke", `black`);
		minuteArrow.setAttribute("stroke-opacity", 0.7);
		minuteArrow.setAttribute("stroke-width", yellowCircle.getBoundingClientRect().width / 90);
		minuteArrow.setAttribute("stroke-linecap", `round`);
		minuteArrow.setAttribute("x1", yellowCenterX);
		minuteArrow.setAttribute("y1", yellowCenterY * 1.05);
		minuteArrow.setAttribute("x2", yellowCenterX);
		minuteArrow.setAttribute("y2", yellowCenterY - (yellowCircle.getBoundingClientRect().height / 2.6));
		SVGclock.appendChild(minuteArrow)
		//часовая стрелка
		let hourArrow = document.createElementNS("http://www.w3.org/2000/svg", 'line');
		hourArrow.classList = `arrow`;
		hourArrow.style.transformOrigin = `${yellowCenterX}px`
		hourArrow.setAttribute("stroke", `black`);
		hourArrow.setAttribute("stroke-opacity", 0.7);
		hourArrow.setAttribute("stroke-width", yellowCircle.getBoundingClientRect().width / 40);
		hourArrow.setAttribute("stroke-linecap", `round`);
		hourArrow.setAttribute("x1", yellowCenterX);
		hourArrow.setAttribute("y1", yellowCenterY * 1.05);
		hourArrow.setAttribute("x2", yellowCenterX);
		hourArrow.setAttribute("y2", yellowCenterY - (yellowCircle.getBoundingClientRect().height / 3.8));
		SVGclock.appendChild(hourArrow)

		//Обновление стрелок и времени каждую секунду
		setInterval(currentTime, 1000);
		let middleTime = document.createElementNS("http://www.w3.org/2000/svg", 'text');
		function currentTime() {
			let data = new Date();
			console.log(data)
			middleTime.textContent = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`
			if (document.getElementsByClassName(`clock`)[0]) {
				arrowsPosition(data)
			}
		}

		//Присоединение счетчика времени к часам
		SVGclock.appendChild(middleTime);
		middleTime.setAttribute("x", yellowCenterX / 100 * 75);
		middleTime.setAttribute("y", yellowCenterY / 100 * 65);
		middleTime.style.fontSize = `${el.value / 10}`;

		//Чтобы стрелки и время в центре сразу были готовы
		let data = new Date();
		middleTime.innerHTML = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`
		arrows = document.getElementsByClassName(`arrow`)
		arrowsPosition(data);
	}
}

//Движение: секундная на 6 градусов в секунду, минутная на 6 градусов в минуту, часовая на 30 градусов в час и на пол градуса в минуту
function arrowsPosition(AnyData) {
	arrows[0].style.transform = `rotate(${AnyData.getSeconds() * 6}deg)`
	arrows[1].style.transform = `rotate(${AnyData.getMinutes() * 6}deg)`
	arrows[2].style.transform = `rotate(${(AnyData.getHours() * 30) + (AnyData.getMinutes() / 2)}deg)`
}