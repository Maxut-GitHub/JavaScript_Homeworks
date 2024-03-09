"use strict";
//импорт всех предметов
import allItemsArray from './items.js';
import * as view from './view.js';

//Таймер (60фпс)
setInterval(tick, 1000 / 60);

function tick() {
	//нанесение урона игроку
	for (let i = 0; i < enemyArray.length; i++) {
		player.HP -= enemyArray[i].damage;
	}

	//Передвижение игрока
	view.playerPositionUpdate()
	player.posX += player.speedX;
	player.posY += player.speedY;
	//отскок игрока от стен
	// ВСЕ ЧИСЛА ПОДОБРАНЫ ДЛЯ РАБОТЫ С ПРОЦЕНТАМИ % `floor`
	// отскок от нижнего пола
	if (player.posY > 62) {
		player.speedY = 0;
		player.posY = 62;
	}
	// отскок от верха пола
	if (player.posY < 1) {
		player.speedY = 0;
		player.posY = 1;
	}
	// отскок от левой стенки
	if (player.posX < 5) {
		player.speedX = 0;
		player.posX = 5;
	}
	// отскок от правой стенки
	if (player.posX > 90) {
		player.speedX = 0;
		player.posX = 90;
	}

	//движение врагов
	for (let i = 0; i < enemyArray.length; i++) {
		view.enemyPositionUpdate(i);
		enemyArray[i].posX += enemyArray[i].speedX;
		enemyArray[i].posY += enemyArray[i].speedY;
		// ВСЕ ЧИСЛА ПОДОБРАНЫ ДЛЯ РАБОТЫ С ПРОЦЕНТАМИ % `floor`
		// отскок от нижнего пола
		if (enemyArray[i].posY > 62) {
			enemyArray[i].speedY = -enemyArray[i].speedY;
			enemyArray[i].posY = 62;
		}
		// отскок от верха пола
		if (enemyArray[i].posY < 1) {
			enemyArray[i].speedY = -enemyArray[i].speedY;
			enemyArray[i].posY = 1;
		}
		// отскок от левой стенки
		if (enemyArray[i].posX < 5) {
			enemyArray[i].speedX = -enemyArray[i].speedX;
			enemyArray[i].posX = 5;
		}
		// отскок от правой стенки
		if (enemyArray[i].posX > 90) {
			enemyArray[i].speedX = -enemyArray[i].speedX;
			enemyArray[i].posX = 90;
		}
	}

	//Нанесение урона врагу, если он в находится в области `damageRange`. Если противник убит, его HP становится `undefined` 
	let damageRange = document.getElementById(`damageRange`);
	let damageRangeInfo = damageRange.getBoundingClientRect();
	for (let i = 0; i < enemyArray.length; i++) {
		let enemyInfo = enemyElArray[i].getBoundingClientRect();
		if (damageRangeInfo.x < enemyInfo.x + enemyInfo.width && damageRangeInfo.x + damageRangeInfo.width > enemyInfo.x &&
			damageRangeInfo.y < enemyInfo.y + enemyInfo.height && damageRangeInfo.y + damageRangeInfo.height > enemyInfo.y) {
			enemyArray[i].HP -= player.damage;
			if (enemyArray[i].HP <= 0) {
				enemyArray[i].death();
				enemyArray[i].HP = undefined;
			}
		}
	}

	checkHealsbar()
}

//текущий уровень комнаты (все скейлы зависят ОТ ЭТОГО ЧИСЛА)
let currentLevel = 1;
//текущий уровень (тег) показывается в левом верхнем углу экрана
let currentLevelElement = document.getElementById(`levelText`);
currentLevelElement.textContent = `level ` + currentLevel + ` Работа над выпускным проектом Максима Б. группа FD2-140-23-12`;

//коэфициент расчета здоровья врагов
let enemyHPIndex = 0.3;
//коэфициент расчета урона врагов
let enemyDamageIndex = 0.01;
//коэфициент расчета скорости врагов
let enemySpeedXIndex = 0.3;
let enemySpeedYIndex = 0.3;

//массив врагов (для добавления в комнату)
export let enemyArray = [];
//массив врагов ЭЛЕМЕНТОВ (тегов)
export let enemyElArray = [];

//тег `body` (для присоединения к нему modalGlass)
let body = document.getElementsByTagName(`body`)[0];

//подсчет фрагов
let allkillsCount = 0;
let roomKillsCount = 0;

//статус игры
export let gameStatus = `fight`

//сундук
export let chest = {};
export let chestElement = document.createElement(`div`);

//верхняя дверь
let doorElement = document.getElementById(`doorTop`);
doorElement.onclick = enterTheDoor;

//стекло для модельного окна (чтобы запретить игроку нажимать на что-либо с z-индексом менее 5)
let modalGlass = document.createElement(`div`);
modalGlass.style.cssText = `position: fixed; width: 100%; height: 100%; background-color: #2b2b2b; opacity: 0.5; z-index: 5 `

//игрок
export let player = {
	weapon: `none`,
	boots: `none`,
	bodyArmor: `none`,
	helmet: `none`,
	armor: 0,
	maxHP: 1000,
	HP: undefined,
	damage: 0.1,
	range: 10,
	canMove: true,
	speed: 0.3,
	speedX: 0,
	speedY: 0,
	posX: 47.5,
	posY: 62,

	move: function (x, y) {
		if (x) {
			this.speedX = x;
		} else if (y) {
			this.speedY = y * 2;
		}
	},

	stop: function (x, y) {
		if (x === 0) {
			this.speedX = x;
		} else if (y === 0) {
			this.speedY = y;
		}
	}
}
//Элемент игрока
export let playerElement = document.createElement(`div`);
playerElement.style.cssText = `background-image: url(SVGLibrary/player/player.svg);
background-size: contain; background-repeat: no-repeat; width: 5vw; height: 5vw; position: absolute; z-index: 4`

//Проверка инвентаря у игрока (показать оружие в руке, если есть в инвентаре и показать оружие/доспехи в слотах) дать игроку урон исходя из его оружия + обновить круг урона
function checkInventory() {
	player.armor = 0;
	if (player.weapon != `none`) {
		player.damage = player.weapon.damage;
		player.range = player.weapon.range;
	}
	if (player.boots != `none`) {
		player.speed = player.boots.moveSpeed;
		player.armor += player.boots.armor;
	}
	if (player.bodyArmor != `none`) {
		player.armor += player.bodyArmor.armor;
	}
	if (player.helmet != `none`) {
		player.armor += player.helmet.armor;
	}
	console.log(`броня игрока: ` + player.armor)
	view.checkViewInventory()
}

//добавление игрока в комнату
function playerInRoom() {
	floor.appendChild(playerElement)
	player.HP = 1000;
}

//Создать массив врагов (Размер массива зависит от LVL)
function createArrayEnemy() {
	//расчет кол-ва, урона, ХП и внешнего вида мобов. Всё зависит от LVL
	const enemyCount = Math.floor(Math.random() * (currentLevel) + 1)
	for (let i = 0; i < enemyCount; i++) {
		let HP = (enemyHPIndex * currentLevel * (Math.floor(Math.random() * 5) + 1)).toFixed(2)
		let damage = (enemyDamageIndex * currentLevel * (Math.floor(Math.random() * 5) + 1)).toFixed(2)
		//view - внешний вид моба
		let view = 1;
		if (damage > 0.5 && damage < 1) {
			view = 2
		} else if (damage >= 1) {
			view = 3
		}
		//Направление по X и Y рандомны (всего 4 направления для врага)
		if (Math.round(Math.random()) === 1) {
			enemySpeedXIndex = -enemySpeedXIndex;
		}
		if (Math.round(Math.random()) === 1) {
			enemySpeedYIndex = -enemySpeedYIndex;
		}
		//view - внешний вид моба
		//pozX и poxY случайны и подобраны так, чтобы моб всегда был в пределых комнаты
		let enemy = {
			id: i,
			damage: damage,
			HP: HP,
			view: view,
			speedX: enemySpeedXIndex,
			speedY: enemySpeedYIndex,
			posX: randomPositionFloor(`X`),
			posY: randomPositionFloor(`Y`),
			death: function () {
				enemyElArray[this.id].style.backgroundImage = `url(SVGLibrary/enemy/enemyCorpse.svg)`;
				enemyElArray[this.id].style.zIndex = 1;
				this.damage = 0;
				this.speedX = 0,
					this.speedY = 0,
					console.log(`противник убит`)
				roomKillsCount++;
				allkillsCount++;
				if (roomKillsCount === enemyArray.length) {
					console.log(`%cКомната зачищена!`, `color: Lime`);
					gameStatus = `roomClear`;
					chest.status = `open`;
				}
			}
		}
		enemyArray.push(enemy)
	}
}

//создать сундук и положить в него лут (+меню с лутом)
function createChest() {
	let loot;
	//lootType 1 - оружие, 2 - сапоги, 3 - нагрудник, 4 - шлем
	let lootType = ``;
	//lootTypeNumber нужна для нахождения типа в массиве allItemsArray
	let lootTypeNumber = (Math.floor((Math.random() * 3) + 0.5));
	switch (lootTypeNumber) {
		case 0: lootType = `weapon`
			break;
		case 1: lootType = `boots`
			break;
		case 2: lootType = `bodyArmor`
			break;
		case 3: lootType = `helmet`
			break;
	}
	//Если тип лута - weapon, то вместо редкости ролится вид оружия 
	if (lootType != `weapon`) {
		let lootRarity = Math.floor(currentLevel / 3 + (Math.random()));
		if (lootRarity > allItemsArray[lootTypeNumber].length - 1) {
			lootRarity = allItemsArray[lootTypeNumber].length - 1
		}
		loot = allItemsArray[lootTypeNumber][lootRarity];
	} else if (lootType === `weapon`) {
		let weaponType = Math.floor(currentLevel / 3 + (Math.random()));
		if (weaponType > allItemsArray[0].length - 1) {
			weaponType = allItemsArray[0].length - 1;
		}
		loot = allItemsArray[0][weaponType];
	}
	console.log(`%cВ сундуке лежит ${loot.name}`, `color: yellow`);
	chest = {
		loot: loot,
		posX: randomPositionFloor(`X`),
		posY: randomPositionFloor(`Y`),
		status: `closed`,
		open: function () {
			if (this.status === `open`) {
				//модальное окно (табличка со взятием предмета)
				chestElement.style.backgroundImage = `url(SVGLibrary/chest/chestOpenWithLoot.svg)`
				body.appendChild(modalGlass)

				let modalWindowChest = document.createElement(`div`);
				modalWindowChest.style.cssText = `display: flex; position: absolute; width: 50vw; height: 27vw; background-color: #6e6b1a;
				left: 25vw; top: 10vw; padding: 2vw; border: solid 0.5vw #7f3f00; border-radius:  6vw 6vw 1vw 1vw; z-index: 6`
				body.appendChild(modalWindowChest)

				//левая сторона окна (кнопка взятия и наоборот)
				let Buttons = document.createElement(`div`);
				Buttons.style.cssText = `width: 10vw; height: 16vw; display: flex; flex-direction: column; justify-content: space-between; margin: 2vw 4vw 2vw 0; `
				modalWindowChest.appendChild(Buttons)

				let tikeItemButton = document.createElement(`input`);
				tikeItemButton.setAttribute(`type`, `button`);
				tikeItemButton.setAttribute(`value`, `Взять`);
				tikeItemButton.onclick = takeItem;
				tikeItemButton.style.cssText = ` width: 10vw; height: 6vw; background-color: rgb(172, 172, 172); font-size: 2vw; align-self: flex-end;`
				Buttons.appendChild(tikeItemButton)

				let notTakeItemButton = document.createElement(`input`);
				notTakeItemButton.setAttribute(`type`, `button`);
				notTakeItemButton.setAttribute(`value`, `Оставить`);
				notTakeItemButton.onclick = notTakeItem;
				notTakeItemButton.style.cssText = ` width: 10vw; height: 6vw; background-color: rgb(172, 172, 172); font-size: 2vw; align-self: flex-end;`
				Buttons.appendChild(notTakeItemButton)

				//Правая сторона окна (иконка предмета и описание)
				let itemDescription = document.createElement(`div`);
				itemDescription.style.cssText = `display: flex; flex-direction: column; align-items: center; width: 100%; height: 22vw;`;
				modalWindowChest.appendChild(itemDescription)

				let itemImage = document.createElement(`div`);
				itemImage.style.cssText = `width: 10vw; height: 10vw; background-color: rgb(172, 172, 172);
				background-size: contain; background-repeat: no-repeat; margin-bottom: 2vw; border: solid 0.2vw `;
				itemImage.style.backgroundImage = loot.view;
				itemDescription.appendChild(itemImage)

				let itemsStats = document.createElement(`div`);
				itemsStats.style.cssText = `width: 100%; height: 10vw; background-color: rgb(172, 172, 172); font-size: 1.6vw; padding: 1vw; border: solid 0.2vw`;
				if (lootType != `weapon`) {

					if (lootType === `boots`) {
						itemsStats.innerHTML = `${loot.name} <br>
					броня: ${loot.armor} ${player.boots.armor ? `(ваши сапоги: ${player.boots.armor})` : ``} <br>
					скорость бега: ${loot.moveSpeed} (сейчас: ${player.speed})`
					}
					else if (lootType === `bodyArmor`) {
						itemsStats.innerHTML = `${loot.name} <br>
					броня: ${loot.armor} ${player.bodyArmor.armor ? `(ваш нагрудник: ${player.bodyArmor.armor})` : ``}`
					}
					else if (lootType === `helmet`) {
						itemsStats.innerHTML = `${loot.name} <br>
					броня: ${loot.armor} ${player.helmet.armor ? `(ваш шлем: ${player.helmet.armor})` : ``}`
					}

				} else if (lootType === `weapon`) {
					itemsStats.innerHTML = `${loot.name} <br>
				урон: ${loot.damage} (сейчас: ${player.damage}) <br>
				дальность: ${loot.range} (сейчас: ${player.range})`
				}

				itemDescription.appendChild(itemsStats)

				function takeItem() {
					player[lootType] = loot;
					checkInventory()
					modalWindowChest.remove();
					modalGlass.remove();
					chestElement.style.backgroundImage = `url(SVGLibrary/chest/chestOpen.svg)`
					chest.status = `closed`;
				}

				function notTakeItem() {
					modalWindowChest.remove();
					modalGlass.remove();
					chestElement.style.backgroundImage = `url(SVGLibrary/chest/chestClosedWithLoot.svg)`
				}
			}
		}
	}
	chestElement.style.cssText = `background-image: url(SVGLibrary/chest/chestClosed.svg);
	background-size: contain; background-repeat: no-repeat; width: 5vw; height: 5vw; position: absolute;
	left: ${chest.posX}%; top: ${chest.posY}%; z-index: 2`;
	floor.appendChild(chestElement);
}

//Заполнить комнату врагами
function nextRoom() {
	console.log(`%cВ комнате появились враги в размере: ${enemyArray.length}`, `color: red`);
	for (let i = 0; i < enemyArray.length; i++) {
		let enemyElement = document.createElement(`div`);
		view.enemyView(enemyElement, i);
		console.log(`%c Враг: ${enemyArray[i].HP} hp, ${enemyArray[i].damage} damage`, `color: red`);
		//у каждого врага (элемента) есть свой id, совпадающий с его индексом в массиме enemyArray
		enemyElement.id = enemyArray[i].id;
		enemyElArray.push(enemyElement);
		floor.appendChild(enemyElement)
	}
}

//Проверка полоски здоровья
function checkHealsbar() {
	if (player.HP > 0) {
		view.changeHealsbar();
	}
	if (player.HP < 0) {
		view.HealsbarIsZero();
		body.appendChild(modalGlass)
		gameStatus = `defeat`;
		player.canMove = false;
		player.speedX = 0;
		player.speedY = 0;
		player.damage = 0;
		player.HP = undefined;
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

//Зайти в следующую комнату
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
		chest.status = `closed`
		player.HP = player.maxHP + player.armor;
		player.posX = 47.5;
		player.posY = 62;
		gameStatus = `fight`;
	}
}

checkInventory();
playerInRoom();
createArrayEnemy();
createChest();
nextRoom();

