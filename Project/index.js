"use strict";

//Таймер (60фпс)
let key = setInterval(tick, 1000 / 60);

function tick() {

	for (let i = 0; i < enemyArray.length; i++) {
		player.HP -= enemyArray[i].damage;
	}

	checkHealsbar()
}

//текущий уровень комнаты (все скейлы зависят ОТ ЭТОГО ЧИСЛА)
let currentLevel = 20;
//текущий уровень (тег) показывается в левом верхнем углу экрана
let currentLevelElement = document.getElementById(`levelText`);
currentLevelElement.textContent = `level ` + currentLevel;

//массив врагов (для добавления в комнату)
let enemyArray = [];
//массив врагов ЭЛЕМЕНТОВ (тегов)
let enemyElArray = [];

//текущая комната (пол)
const floor = document.getElementById(`floor`);

//текущее здоровье (красная полоска)
let healsbarCurrentHP = document.getElementById(`HP`);
//счетчик здоровья(белая цифра в хелсбаре)
let healsbarCountCurrentHP = document.getElementById(`HPcount`);

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
playerElement.style.cssText = `background-image: url(SVGLibrary/player/player.svg);
background-size: contain; background-repeat: no-repeat; width: 5vw; height: 5vw; position: relative; z-index: 3`

//подсчет фрагов
let allkillsCount = 0;
let roomKillsCount = 0;

//статус игры
let gameStatus = `fight`

//сундук
let chest = {};

//верхняя дверь
let doorElement = document.getElementById(`doorTop`);
doorElement.onclick = enterTheDoor;

//стекло для модельного окна (чтобы запретить игроку нажимать на что-либо с z-индексом менее 4)
let modalGlass = document.createElement(`div`);
modalGlass.style.cssText = `position: fixed; width: 100%; height: 100%; z-index: 4`


// ЧТОБЫ добавить новое оружие, нужно: 
//нарисовать svg оружия
//нарисовать svg игрока с оружием в руках
//дать название оружию НАЗВАНИЕ С БОЛЬШОЙ БУКВЫ `Sword`
//добавить оружие в пул сундука 	} else if(weaponType === ЧЕМ БОЛЬШЕ ЦИФРА, ТЕМ ПОЗЖЕ БУДЕТ ВСТРЕЧАТЬСЯ ОРУЖИЕ) {weaponType = `Sword`}
//добавить оружие в объект damageWeapon, указать урон

//Урон всех оружий
let damageWeapon = {
	Sword: 3,
	Spear: 5,
	Hammer: 10,
	Bow: 20,
}

let player = {
	weapon: `none`,
	boots: `none`,
	bodyArmor: `none`,
	helmet: `none`,
	HP: 1000,
	damage: 1,
}

//Проверка инвентаря у игрока (показать оружие в руке, если есть в инвентаре и показать оружие/доспехи в слотах) дать игроку урон исходя из его оружия
function checkInventory() {
	if (player.weapon != `none`) {
		playerElement.style.backgroundImage = `url(SVGLibrary/player/player${player.weapon}.svg)`
		player.damage = damageWeapon[player.weapon];
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
	console.log(`енеми каунт = ` + enemyCount)
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
		console.log(i)
		let enemy = {
			id: i,
			damage: damage,
			HP: HP,
			view: view,
			posX: randomPositionFloor(`X`),
			posY: randomPositionFloor(`Y`),
			death: function () {
				enemyElArray[this.id].style.backgroundImage = `url(SVGLibrary/enemy/enemyCorpse.svg)`;
				enemyElArray[this.id].style.zIndex = 1;
				this.damage = 0;
				roomKillsCount++;
				console.log(`фрагов в комнате: ` + roomKillsCount)
				if (roomKillsCount === enemyArray.length) {
					console.log(`%cКомната зачищена!`, `color: Lime`);
					gameStatus = `roomClear`;
				}
			}
		}
		enemyArray.push(enemy)
	}
}
createArrayEnemy()

//создать сундук и положить в него лут
function createChest() {
	//lootType 1 - оружие, 2 - сапоги, 3 - нагрудник, 4 - шлем
	let lootType = (Math.floor(Math.random() * 4) + 1);
	switch (lootType) {
		case 1: lootType = `weapon`
			break;
		case 2: lootType = `boots`
			break;
		case 3: lootType = `bodyArmor`
			break;
		case 4: lootType = `helmet`
			break;
	}
	//lootRarity 1 - обычный, 2 - магический, 3 - редкий, 4 - уникальный
	//игроку на 1 уровне может попасться обычный или волшебный предмет. После 3 уровня волшебный или редкий и так далее
	let lootRarity;
	//Если тип лута - weapon, то вместо редкости ролится вид оружия 
	let weaponType;
	if (lootType != `weapon`) {
		lootRarity = Math.floor(1 + currentLevel / 3 + (Math.random()));
		if (lootRarity === 1) {
			lootRarity = `Common`
		} else if
			(lootRarity === 2) {
			lootRarity = `Magic`
		} else if
			(lootRarity === 3) {
			lootRarity = `Rare`
		} else if
			(lootRarity >= 4) {
			lootRarity = `Unique`
		}
	} else if (lootType === `weapon`) {
		weaponType = Math.floor(1 + currentLevel / 3 + (Math.random()));
		if (weaponType === 1) {
			weaponType = `Sword`
		} else if
			(weaponType === 2) {
			weaponType = `Spear`
		} else if
			(weaponType >= 3 && weaponType < 5) {
			weaponType = `Hammer`
		} else if
			(weaponType >= 5) {
			weaponType = `Bow`
		}

	}
	chest = {
		loot: `${lootType + lootRarity}`,
		posX: randomPositionFloor(`X`),
		posY: randomPositionFloor(`Y`),
	}
	let chestElement = document.createElement(`div`);
	chestElement.style.cssText = `background-image: url(SVGLibrary/chest/chestClosed.svg);
	background-size: contain; background-repeat: no-repeat; width: 5vw; height: 5vw; position: absolute;
	left: ${chest.posX}%; top: ${chest.posY}%; z-index: 2`;
	chestElement.id = `chest`
	floor.appendChild(chestElement);

	chestElement.addEventListener(`click`, openChest)

	function openChest() {
		if (gameStatus === `roomClear`) {


			//модальнок окно (табличка со взятием предмета)
			let body = document.getElementsByTagName(`body`)[0];
			chestElement.style.backgroundImage = `url(SVGLibrary/chest/chestOpenWithLoot.svg)`
			let modalWindowChest = document.createElement(`div`);
			modalWindowChest.style.cssText = `display: flex; position: absolute; width: 20vw; height: 15vw; background-color: rgb(84, 80, 84);
		left: 40%; top: 20%; padding: 2vw; gap: 0.5vw; border-radius: 4vw 4vw 0 0; z-index: 5`
			body.appendChild(modalWindowChest)

			body.appendChild(modalGlass)

			let tikeItemButton = document.createElement(`input`);
			tikeItemButton.setAttribute(`type`, `button`);
			tikeItemButton.setAttribute(`value`, `Взять`);
			tikeItemButton.onclick = takeItem;
			tikeItemButton.style.cssText = ` width: 5vw; height: 3vw; background-color: rgb(172, 172, 172); font-size: 1vw; align-self: flex-end;`
			modalWindowChest.appendChild(tikeItemButton)

			let itemImage = document.createElement(`div`);
			itemImage.style.cssText = ` width: 5vw; height: 5vw; background-color: rgb(172, 172, 172); background-size: contain; background-repeat: no-repeat`
			if (lootType != `weapon`) {
				itemImage.style.backgroundImage = `url(SVGLibrary/${lootType}/${lootType + lootRarity}.svg`
			} else if (lootType === `weapon`) {
				itemImage.style.backgroundImage = `url(SVGLibrary/${lootType}/${weaponType}.svg`
			}
			modalWindowChest.appendChild(itemImage)

			let notTakeItemButton = document.createElement(`input`);
			notTakeItemButton.setAttribute(`type`, `button`);
			notTakeItemButton.setAttribute(`value`, `Оставить`);
			notTakeItemButton.onclick = notTakeItem;
			notTakeItemButton.style.cssText = ` width: 5vw; height: 3vw; background-color: rgb(172, 172, 172); font-size: 1vw; align-self: flex-end;`
			modalWindowChest.appendChild(notTakeItemButton)

			function takeItem() {
				if (lootType != `weapon`) {
					player[lootType] = lootType + lootRarity;
				} else if (lootType === `weapon`) {
					player[lootType] = weaponType;
				}
				checkInventory()
				modalWindowChest.remove();
				modalGlass.remove();
				chestElement.style.backgroundImage = `url(SVGLibrary/chest/chestOpen.svg)`
				chestElement.removeEventListener(`click`, openChest)
			}

			function notTakeItem() {
				modalWindowChest.remove();
				modalGlass.remove();
				chestElement.style.backgroundImage = `url(SVGLibrary/chest/chestClosedWithLoot.svg)`
			}
		}
	}
}
createChest()

//Заполнить комнату врагами
function nextRoom() {
	console.log(`%cВ комнате появились враги в размере: ${enemyArray.length}`, `color: red`);
	for (let i = 0; i < enemyArray.length; i++) {
		let enemyElement = document.createElement(`div`);
		enemyElement.style.cssText = `background-image: url(SVGLibrary/enemy/enemy${enemyArray[i].view}.svg);
		background-size: contain; background-repeat: no-repeat; width: 5vw; height: 5vw; position: absolute;
		left: ${enemyArray[i].posX}%; top: ${enemyArray[i].posY}%; z-index: 2`;
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
			}
		}
		enemyElArray.push(enemyElement);
		floor.appendChild(enemyElement)
	}
}
nextRoom()

//Проверка полоски здоровья
function checkHealsbar() {
	if (player.HP > 0) {
		healsbarCurrentHP.style.width = `${player.HP / 10}%`;
		healsbarCountCurrentHP.textContent = player.HP.toFixed(0);
	}
	if (player.HP <= 0) {
		healsbarCurrentHP.style.width = `${0}%`;
		healsbarCountCurrentHP.textContent = 0;
		playerElement.style.backgroundImage = `url(SVGLibrary/player/playerCorpse.svg)`;
		gameStatus = `defeat`;
	}
}

//Создание случайных координат для различных объектов (рассчитано для floor) в аргумент передавать строку `X` или `Y`
function randomPositionFloor(stringXY) {
	if (stringXY === `X`) {
		//максимум 90 минимум 5
		return (Math.floor(Math.random() * 85) + 5);
	} else if (stringXY === `Y`) {
		//максимум 50 минимум 5
		return (Math.floor(Math.random() * 45) + 5);
	}
}


function enterTheDoor() {
	if (gameStatus === `roomClear`) {
		//удаление всего из прошлой комнаты
		for (let i = 0; i < enemyArray.length; i++) {
			enemyElArray[i].remove();
		}
		for (let i = 0; i < enemyArray.length; i++) {
			enemyElArray.shift();
		}
		enemyArray = [];
		let chestElement = document.getElementById(`chest`);
		chestElement.remove();
		roomKillsCount = 0;
		chest = {};

		//повышение уровня
		++currentLevel;
		currentLevelElement.textContent = `level ` + currentLevel;

		//создание всего нового
		createArrayEnemy();
		nextRoom();
		createChest();
		player.HP = 1000;
		gameStatus = `fight`;
	}
}

