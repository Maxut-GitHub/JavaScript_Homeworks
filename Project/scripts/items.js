"use strict";

// ОРУЖИТЕ ----------------------------------------------------------------------
// массив всего оружия
let weaponArray = [];

const Sword = {
	name: `Меч`,
	damage: 0.3,
	range: 20,
	view: `url(SVGLibrary/weapon/Sword.svg)`,
	playerView: `url(SVGLibrary/player/playerSword.svg)`,
}
weaponArray.push(Sword)

const Spear = {
	name: `Копье`,
	damage: 0.5,
	range: 30,
	view: `url(SVGLibrary/weapon/Spear.svg)`,
	playerView: `url(SVGLibrary/player/playerSpear.svg)`,
}
weaponArray.push(Spear)

const Hammer = {
	name: `Молот`,
	damage: 0.8,
	range: 20,
	view: `url(SVGLibrary/weapon/Hammer.svg)`,
	playerView: `url(SVGLibrary/player/playerHammer.svg)`,
}
weaponArray.push(Hammer)

const Bow = {
	name: `Лук`,
	damage: 0.5,
	range: 60,
	view: `url(SVGLibrary/weapon/Bow.svg)`,
	playerView: `url(SVGLibrary/player/playerBow.svg)`,
}
weaponArray.push(Bow)

// ДОСПЕХИ ----------------------------------------------------------------------
//массив всех элементов доспехов

//массив всех сапог
let bootsArray = [];
// Сапоги
const LeatherBoots = {
	name: `Кожанные ботинки`,
	armor: 5,
	moveSpeed: 0.5,
	view: `url(SVGLibrary/boots/leatherBoots.svg)`,
}
bootsArray.push(LeatherBoots)

const IronBoots_lowQuality = {
	name: `Некачественные Железные ботинки`,
	armor: 10,
	moveSpeed: 0.3,
	view: `url(SVGLibrary/boots/IronBoots_lowQuality.svg)`,
}
bootsArray.push(IronBoots_lowQuality)

const IronBoots_awerageQuality = {
	name: `Железные ботинки`,
	armor: 20,
	moveSpeed: 0.4,
	view: `url(SVGLibrary/boots/IronBoots_awerageQuality.svg)`,
}
bootsArray.push(IronBoots_awerageQuality)

const IronBoots_highQuality = {
	name: `Высококачественные Железные ботинки`,
	armor: 30,
	moveSpeed: 0.5,
	view: `url(SVGLibrary/boots/IronBoots_highQuality.svg)`,
}
bootsArray.push(IronBoots_highQuality)

const IronBoots_PerfectQuality = {
	name: `Идельные Железные ботинки`,
	armor: 60,
	moveSpeed: 0.6,
	view: `url(SVGLibrary/boots/IronBoots_PerfectQuality.svg)`,
}
bootsArray.push(IronBoots_PerfectQuality)

const SpikedBoots = {
	name: `Шипастые ботинки (будет больно)`,
	armor: -500,
	moveSpeed: 1,
	view: `url(SVGLibrary/boots/SpikedBoots.svg)`,
}
bootsArray.push(SpikedBoots)

//массив всех нагрудных доспех
let bodyArmorArray = [];
// Нагрудный доспех
const LeatherBodyArmor = {
	name: `Кожанный Нагрудный доспех`,
	armor: 25,
	view: `url(SVGLibrary/bodyArmor/LeatherBodyArmor.svg)`,
}
bodyArmorArray.push(LeatherBodyArmor)

const IronBodyArmor_lowQuality = {
	name: `Некачественный Железный нагрудник`,
	armor: 100,
	view: `url(SVGLibrary/bodyArmor/IronBodyArmor_lowQuality.svg)`,
}
bodyArmorArray.push(IronBodyArmor_lowQuality)

const IronBodyArmor_awerageQuality = {
	name: `Железный нагрудник`,
	armor: 150,
	view: `url(SVGLibrary/bodyArmor/IronBodyArmor_awerageQuality.svg)`,
}
bodyArmorArray.push(IronBodyArmor_awerageQuality)

const IronBodyArmor_highQuality = {
	name: `Высококачественный Железный нагрудник`,
	armor: 200,
	view: `url(SVGLibrary/bodyArmor/IronBodyArmor_highQuality.svg)`,
}
bodyArmorArray.push(IronBodyArmor_highQuality)

const IronBodyArmor_PerfectQuality = {
	name: `Идеальный Железный нагрудник`,
	armor: 350,
	view: `url(SVGLibrary/bodyArmor/IronBodyArmor_PerfectQuality.svg)`,
}
bodyArmorArray.push(IronBodyArmor_PerfectQuality)

//массив всех нагрудных доспех
let helmetArray = [];
// Шлем
const LeatherHelmet = {
	name: `Кожанный шлем`,
	armor: 20,
	view: `url(SVGLibrary/helmet/LeatherHelmet.svg)`,
}
helmetArray.push(LeatherHelmet)

const IronHelmet_lowQuality = {
	name: `Некачественный Железный шлем`,
	armor: 40,
	view: `url(SVGLibrary/helmet/IronHelmet_lowQuality.svg)`,
}
helmetArray.push(IronHelmet_lowQuality)

const IronHelmet_awerageQuality = {
	name: `Железный шлем`,
	armor: 70,
	view: `url(SVGLibrary/helmet/IronHelmet_awerageQuality.svg)`,
}
helmetArray.push(IronHelmet_awerageQuality)

const IronHelmet_highQuality = {
	name: `Высококачественный Железный шлем`,
	armor: 100,
	view: `url(SVGLibrary/helmet/IronHelmet_highQuality.svg)`,
}
helmetArray.push(IronHelmet_highQuality)

const IronHelmet_PerfectQuality = {
	name: `Идеальный Железный шлем`,
	armor: 200,
	view: `url(SVGLibrary/helmet/IronHelmet_PerfectQuality.svg)`,
}
helmetArray.push(IronHelmet_PerfectQuality)

let allItemsArray = [];
allItemsArray.push(bootsArray);
allItemsArray.push(bodyArmorArray);
allItemsArray.push(helmetArray);
allItemsArray.push(weaponArray);

//экспорт массива всех объектов 
export default allItemsArray;