"use strict";

function randomDiap(n, m) {
	return Math.floor(Math.random() * (m - n + 1)) + n;
}

function mood(colorsCount) {
	let colors = {
		//массив заменил на объект с ключами номерами
		1: "красный",
		2: "оранжевый",
		3: "жёлтый",
		4: "зелёный",
		5: "голубой",
		6: "синий",
		7: "фиолетовый",
	};

	console.log("цветов: " + colorsCount);
	for (let i = 1; i <= colorsCount; i++) {
		let n;
		while (colorsCount <= 7) {
			n = randomDiap(1, 7);
			if (colors[n]) {
				//проверка на наличие цвета
				break;
			}
		}
		const colorName = colors[n];
		colors[n] = false; //использованный цвет заменяем на false
		console.log(colorName);
	}
}
mood(3);
