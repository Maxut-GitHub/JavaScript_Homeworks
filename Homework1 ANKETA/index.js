"use strict";
let firstname;
let lastname;
let otch;
let age;
let genderBoolean;
let gender;
let pension = "нет";

while (true) {
	firstname = prompt("Ваше имя");
	if (!firstname) {
	} else break;
}
while (true) {
	lastname = prompt("Ваша фамилия");
	if (!lastname) {
	} else break;
}
while (true) {
	otch = prompt("Ваше отчество");
	if (!otch) {
	} else break;
}
while (true) {
	age = prompt("Ваш возраст");
	age = parseInt(age);
	if (!age) {
	} else break;
}
genderBoolean = confirm(
	'Ваш пол - мужской? Если да, нажмите ОК\nЕсли ваш пол - женский, нажмите "Отмена" '
);
gender = genderBoolean ? "мужской" : "женский";
if (genderBoolean && age >= 63) {
	pension = "да";
} else if (!genderBoolean && age >= 58) {
	pension = "да";
}

alert(`ваше ФИО: ${firstname} ${lastname} ${otch}
ваш возраст в годах: ${age}
ваш возраст в днях: ${age * 360}
через 5 лет вам будет: ${age + 5}
ваш пол: ${gender}
вы на пенсии: ${pension}`);
