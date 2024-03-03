"use strict";

//Таймер (60фпс)
setInterval(tick, 1000 / 60);

function tick() {
	for (let i = 0; i < enemyElArray.length; i++) {
		player.HP -= enemyArray[i].damage
	}
	checkHealsbar()
}


//текущий уровень комнаты (все скейлы зависят ОТ ЭТОГО ЧИСЛА)
let currentLevel = document.getElementById(`level`).textContent;

//массив врагов (для добавления в комнату)
let enemyArray = [];
//массив врагов ЭЛЕМЕНТОВ (тегов) 
let enemyElArray = [];

//текущая комната (пол)
const floor = document.getElementById(`floor`);

//текущее здоровье
let healsbarCurrentHP = document.getElementById(`HP`);

//слоты инвентаря
//текущее оружие 
let currentWeapon = document.getElementById(`weaponSlot`)
//текущее сапоги
let currentBoots = document.getElementById(`bootsSlot`)
//текущий нагрудник
let currentBodyArmor = document.getElementById(`bodyArmorSlot`)
//текущий шлем 
let currentHelmet = document.getElementById(`helmetSlot`)

//Элемент игрока
let playerElement = document.createElement(`div`);
playerElement.style.cssText = `background-image: url(SVGLibrary/player/player.svg);  background-size: contain; background-repeat: no-repeat; width: 5vw; height: 5vw; position: relative`

let player = {
	weapon: `none`,
	boots: `none`,
	bodyArmor: `none`,
	helmet: `none`,
	HP: 1000,
	damage: 1,
}

//Проверка инвентаря у игрока (показать оружие в руке, если есть в инвентаре, а показать оружие/доспехи в слотах)
function checkInventory() {
	if (player.weapon != `none`) {
		playerElement.style.backgroundImage = `url(SVGLibrary/player/player${player.weapon}.svg)`
	}
	currentWeapon.style.backgroundImage = `url(SVGLibrary/weapon/${player.weapon}.svg)`;
	currentHelmet.style.backgroundImage = `url(SVGLibrary/helmet/${player.helmet}.svg)`;
	currentBoots.style.backgroundImage = `url(SVGLibrary/boots/${player.boots}.svg)`;
	currentBodyArmor.style.backgroundImage = `url(SVGLibrary/bodyArmor/${player.bodyArmor}.svg)`;
}
checkInventory()

//добавление игрока в комнату
function playerInRoom() {
	floor.appendChild(playerElement)
}
playerInRoom()

//Создать массив врагов (Размер массива зависит от LVL)
function createArrayEnemy() {
	//расчет кол-ва, урона, ХП и внешнего вида мобов. Всё зависит от LVL
	const enemyCount = Math.floor(Math.random() * (currentLevel) + 1)
	for (let i = 0; i < enemyCount; i++) {
		let HP = 1 * currentLevel * (Math.floor(Math.random() * 5) + 1)
		let damage = (0.01 * currentLevel * (Math.floor(Math.random() * 5) + 1)).toFixed(2)
		let view = 1;
		if (damage > 0.5 && damage < 1) {
			view = 2
		} else if (damage >= 1) {
			view = 3
		}
		//view - внешний вид моба
		//pozX и poxY случайны и подобраны так, чтобы моб всегда был в пределых комнаты
		let enemy = {
			id: i,
			damage: damage,
			HP: HP,
			view: view,
			posX: (Math.floor(Math.random() * (90 - 5)) + 5),
			posY: (Math.floor(Math.random() * (60 - 5)) + 5),
			death: function () {

				enemyElArray[this.id].style.backgroundImage = `url(SVGLibrary/enemy/enemyCorpse.svg)`
				this.damage = 0;
			}
		}
		enemyArray.push(enemy)
	}
}
createArrayEnemy()


//Заполнить комнату врагами
function nextRoom() {
	console.log(`%cВ комнате появились враги в размере: ${enemyArray.length}`, `color: red`);
	for (let i = 0; i < enemyArray.length; i++) {
		let enemyElement = document.createElement(`div`);
		enemyElement.style.cssText = `background-image: url(SVGLibrary/enemy/enemy${enemyArray[i].view}.svg);
		background-size: contain; background-repeat: no-repeat; width: 5vw; height: 5vw; position: absolute;
		left: ${enemyArray[i].posX}%; top: ${enemyArray[i].posY}%;`;
		console.log(`%c Враг: ${enemyArray[i].HP} hp, ${enemyArray[i].damage} damage`, `color: red`);
		//у каждого врага есть свой id, совпадающий с его индексом в массиме enemyArray
		enemyElement.id = enemyArray[i].id;
		//Добавляем слушателя и отнимаем хп у противника за каждый клик. Если HP врага <=0, то он погибает и перестает наносить урон
		enemyElement.addEventListener(`click`, enemyGetHit)
		function enemyGetHit() {
			enemyArray[this.id].HP -= player.damage;
			if (enemyArray[this.id].HP <= 0) {
				enemyArray[this.id].death();
				this.removeEventListener(`click`, enemyGetHit);
				console.log(`%cВраг побежден`, `color: Lime`);
			}
		}
		enemyElArray.push(enemyElement);
		floor.appendChild(enemyElement)
	}
}
nextRoom()

//Проверка полоски здоровья
function checkHealsbar() {
	healsbarCurrentHP.style.width = `${player.HP / 10}%`;
}
checkHealsbar()




