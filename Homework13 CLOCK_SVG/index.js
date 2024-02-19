"use strict";

//Расстояние цифр часов до центра
const numberDistance = 2.4;

function createWatch() {
	let el = document.getElementById(`clock-create`);
	if (el.value >= 200 && el.value <= 800) {
		//Убираем поле с кнопкой 
		let form = document.getElementsByClassName(`for-clock`)[0];
		form.style.display = `none`;
		const radius = parseFloat(el.value / numberDistance);
		//Создаем часы
		let SVGclock = document.getElementsByTagName(`svg`)[0];
		SVGclock.style.display = `block`;

		SVGclock.setAttribute(`width`, el.value)
		SVGclock.setAttribute(`height`, el.value)

		let yellowCircle = document.createElementNS("http://www.w3.org/2000/svg", 'ellipse');
		yellowCircle.setAttribute("fill", "yellow");
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
			greenCircle.setAttribute("fill", "green");
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
	}
}
createWatch()