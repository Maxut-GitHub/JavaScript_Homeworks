"use strict";

// ОРУЖИТЕ ----------------------------------------------------------------------
// массив всего оружия
let weaponArray = [];

const Sword = {
	name: `Sword`,
	damage: 3,
	view: `url(SVGLibrary/weapon/Sword.svg)`,
	playerView: `url(SVGLibrary/player/playerSword.svg)`,
}
weaponArray.push(Sword)

const Spear = {
	name: `Spear`,
	damage: 5,
	view: `url(SVGLibrary/weapon/Spear.svg)`,
	playerView: `url(SVGLibrary/player/playerSpear.svg)`,
}
weaponArray.push(Spear)

const Hammer = {
	name: `Hammer`,
	damage: 10,
	view: `url(SVGLibrary/weapon/Hammer.svg)`,
	playerView: `url(SVGLibrary/player/playerHammer.svg)`,
}
weaponArray.push(Hammer)

const Bow = {
	name: `Bow`,
	damage: 20,
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
	name: `LeatherBoots`,
	armor: 1,
	view: `url(SVGLibrary/boots/leatherBoots.svg)`,
}
bootsArray.push(LeatherBoots)

const IronBoots_lowQuality = {
	name: `IronBoots_lowQuality`,
	armor: 3,
	view: `url(SVGLibrary/boots/IronBoots_lowQuality.svg)`,
}
bootsArray.push(IronBoots_lowQuality)

const IronBoots_awerageQuality = {
	name: `IronBoots_awerageQuality`,
	armor: 5,
	view: `url(SVGLibrary/boots/IronBoots_awerageQuality.svg)`,
}
bootsArray.push(IronBoots_awerageQuality)

const IronBoots_highQuality = {
	name: `IronBoots_highQuality`,
	armor: 7,
	view: `url(SVGLibrary/boots/IronBoots_highQuality.svg)`,
}
bootsArray.push(IronBoots_highQuality)

const IronBoots_PerfectQuality = {
	name: `IronBoots_PerfectQuality`,
	armor: 14,
	view: `url(SVGLibrary/boots/IronBoots_PerfectQuality.svg)`,
}
bootsArray.push(IronBoots_PerfectQuality)

//массив всех нагрудных доспех
let bodyArmorArray = [];
// Нагрудный доспех
const LeatherBodyArmor = {
	name: `LeatherBodyArmor`,
	armor: 2,
	view: `url(SVGLibrary/bodyArmor/LeatherBodyArmor.svg)`,
}
bodyArmorArray.push(LeatherBodyArmor)

const IronBodyArmor_lowQuality = {
	name: `IronBodyArmor_lowQuality`,
	armor: 5,
	view: `url(SVGLibrary/bodyArmor/IronBodyArmor_lowQuality.svg)`,
}
bodyArmorArray.push(IronBodyArmor_lowQuality)

const IronBodyArmor_awerageQuality = {
	name: `IronBodyArmor_awerageQuality`,
	armor: 10,
	view: `url(SVGLibrary/bodyArmor/IronBodyArmor_awerageQuality.svg)`,
}
bodyArmorArray.push(IronBodyArmor_awerageQuality)

const IronBodyArmor_highQuality = {
	name: `IronBodyArmor_highQuality`,
	armor: 15,
	view: `url(SVGLibrary/bodyArmor/IronBodyArmor_highQuality.svg)`,
}
bodyArmorArray.push(IronBodyArmor_highQuality)

const IronBodyArmor_PerfectQuality = {
	name: `IronBodyArmor_PerfectQuality`,
	armor: 30,
	view: `url(SVGLibrary/bodyArmor/IronBodyArmor_PerfectQuality.svg)`,
}
bodyArmorArray.push(IronBodyArmor_PerfectQuality)

//массив всех нагрудных доспех
let helmetArray = [];
// Шлем
const LeatherHelmet = {
	name: `LeatherHelmet`,
	armor: 2,
	view: `url(SVGLibrary/helmet/LeatherHelmet.svg)`,
}
helmetArray.push(LeatherHelmet)

const IronHelmet_lowQuality = {
	name: `IronHelmet_lowQuality`,
	armor: 4,
	view: `url(SVGLibrary/helmet/IronHelmet_lowQuality.svg)`,
}
helmetArray.push(IronHelmet_lowQuality)

const IronHelmet_awerageQuality = {
	name: `IronHelmet_awerageQuality`,
	armor: 6,
	view: `url(SVGLibrary/helmet/IronHelmet_awerageQuality.svg)`,
}
helmetArray.push(IronHelmet_awerageQuality)

const IronHelmet_highQuality = {
	name: `IronHelmet_highQuality`,
	armor: 9,
	view: `url(SVGLibrary/helmet/IronHelmet_highQuality.svg)`,
}
helmetArray.push(IronHelmet_highQuality)

const IronHelmet_PerfectQuality = {
	name: `IronHelmet_PerfectQuality`,
	armor: 18,
	view: `url(SVGLibrary/helmet/IronHelmet_PerfectQuality.svg)`,
}
helmetArray.push(IronHelmet_PerfectQuality)

let allItemsArray = [];
allItemsArray.push(weaponArray);
allItemsArray.push(bootsArray);
allItemsArray.push(bodyArmorArray);
allItemsArray.push(helmetArray);

export default allItemsArray;