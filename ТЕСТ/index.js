
let body = document.getElementsByTagName(`body`)[0];

function createWatch() {
	let el = document.getElementById(`clock-create`);
	if (el.value >= 200 && el.value <= 800) {
		//Убираем поле с кнопкой 
		let form = document.getElementsByClassName(`for-clock`)[0];
		form.style.display = `none`;
		//Создаем часы
		let SVGclock = document.createElement(`svg`);
		body.insertBefore(SVGclock, form);

		SVGclock.setAttribute(`width`, el.value)
		SVGclock.setAttribute(`height`, el.value)
		console.log(SVGclock);

		let yellowCircle = document.createElementNS("http://www.w3.org/2000/svg", 'ellipse');
		yellowCircle.setAttribute("fill", "yellow");
		yellowCircle.setAttribute("rx", 20);
		yellowCircle.setAttribute("ry", 20);
		yellowCircle.setAttribute("cx", 20);
		yellowCircle.setAttribute("cy", 20);
		// SVGclock.appendChild(yellowCircle);

	}
}