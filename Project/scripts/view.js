import { player, playerElement, enemyArray, enemyElArray } from './model.js';

//слоты инвентаря
//текущее оружие 
let currentWeapon = document.getElementById(`weaponSlot`)
//текущее сапоги
let currentBoots = document.getElementById(`bootsSlot`)
//текущий нагрудник
let currentBodyArmor = document.getElementById(`bodyArmorSlot`)
//текущий шлем 
let currentHelmet = document.getElementById(`helmetSlot`)

//текущее здоровье (красная полоска)
let healsbarCurrentHP = document.getElementById(`HP`);
//счетчик здоровья(белая цифра в хелсбаре)
let healsbarCountCurrentHP = document.getElementById(`HPcount`);

//обновление позиции игрока
export function playerPositionUpdate() {
	playerElement.style.left = player.posX + `%`;
	playerElement.style.top = player.posY + `%`;
}
//обновление позиции врага (в аргумент передать его id)
export function enemyPositionUpdate(id) {
	enemyElArray[id].style.left = enemyArray[id].posX + `%`;
	enemyElArray[id].style.top = enemyArray[id].posY + `%`;
}

//обновить отображение полоски здоровья
export function changeHealsbar() {
	healsbarCurrentHP.style.width = `${player.HP / 10}%`;
	healsbarCountCurrentHP.textContent = player.HP.toFixed(0);
}

//чтобы полоска остановилась ровно на 0, +обновить внешний вид игрока
export function HealsbarIsZero() {
	healsbarCurrentHP.style.width = `${0}%`;
	healsbarCountCurrentHP.textContent = 0;
	playerElement.style.backgroundImage = `url(SVGLibrary/player/playerCorpse.svg)`;
}

//обновляет внешнее отображение инвентаря и дальности игрока
export function checkViewInventory() {
	playerElement.style.backgroundImage = player.weapon.playerView;
	currentWeapon.style.backgroundImage = player.weapon.view;
	currentHelmet.style.backgroundImage = player.helmet.view;
	currentBoots.style.backgroundImage = player.boots.view;
	currentBodyArmor.style.backgroundImage = player.bodyArmor.view;
	checkPlayerDamageRange()
}

//стилизовать врага (в аргументах: сам элемент, его id)
export function enemyView(el, id) {
	el.style.cssText = `background-image: url(SVGLibrary/enemy/enemy${enemyArray[id].view}.svg);
	background-size: contain; background-repeat: no-repeat; width: 5vw; height: 5vw; position: absolute; pointer-events: none;
	left: ${enemyArray[id].posX}%; top: ${enemyArray[id].posY}%; z-index: 3`;
}

//Создать или обновить круг урона игрока (Функция срабатывает при checkInventory())
function checkPlayerDamageRange() {
	let playerDamageRange = document.getElementById(`playerDamageRange`)
	//Удаление старого круга урона, если он есть
	if (playerDamageRange) {
		document.getElementById(`playerDamageRange`).remove();
	}
	playerDamageRange = document.createElementNS("http://www.w3.org/2000/svg", `svg`);
	playerDamageRange.id = `playerDamageRange`;
	playerDamageRange.style.cssText = `position: absolute; left: -${450}%; top: -${450}%; pointer-events: none; z-index: 0`;
	playerDamageRange.setAttribute(`width`, 1000 + `%`);
	playerDamageRange.setAttribute(`height`, 1000 + `%`);
	playerElement.appendChild(playerDamageRange);
	let damageRange = document.createElementNS("http://www.w3.org/2000/svg", `rect`);
	damageRange.id = `damageRange`;
	damageRange.setAttribute(`width`, player.range + `%`);
	damageRange.setAttribute(`height`, player.range + `%`);
	damageRange.setAttribute("stroke", `white`);
	damageRange.setAttribute(`stroke-width`, "0.2vw")
	damageRange.setAttribute("stroke-opacity", `0.2`);
	damageRange.setAttribute("stroke-dasharray", `1vw,1.1vw`);
	damageRange.setAttribute(`fill`, "none")
	damageRange.setAttribute("x", 50 - player.range / 2 + `%`);
	damageRange.setAttribute("y", 50 - player.range / 2 + `%`);
	playerDamageRange.appendChild(damageRange);
}