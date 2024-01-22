"use strict";

const formDef1 = [
	{ label: "Название сайта:", kind: "longtext", name: "sitename" },
	{ label: "URL сайта:", kind: "longtext", name: "siteurl" },
	{ label: "Посетителей в сутки:", kind: "number", name: "visitors" },
	{ label: "E-mail для связи:", kind: "shorttext", name: "email" },
	{
		label: "Рубрика каталога:",
		kind: "combo",
		name: "division",
		variants: [
			{ text: "здоровье", value: 1 },
			{ text: "домашний уют", value: 2 },
			{ text: "бытовая техника", value: 3 },
		],
	},
	{
		label: "Размещение:",
		kind: "radio",
		name: "payment",
		variants: [
			{ text: "бесплатное", value: 1 },
			{ text: "платное", value: 2 },
			{ text: "VIP", value: 3 },
		],
	},
	{ label: "Разрешить отзывы:", kind: "check", name: "votes" },
	{ label: "Описание сайта:", kind: "memo", name: "description" },
	{ caption: "Опубликовать", kind: "submit" },
];

const formDef2 = [
	{ label: "Фамилия:", kind: "longtext", name: "lastname" },
	{ label: "Имя:", kind: "longtext", name: "firstname" },
	{ label: "Отчество:", kind: "longtext", name: "secondname" },
	{ label: "Возраст:", kind: "number", name: "age" },
	{ caption: "Зарегистрироваться", kind: "submit" },
];

function dyn_form(arr) {
	let form = document.createElement("form");

	for (let obj of arr) {
		let formGroup = document.createElement("div");
		formGroup.className = "form-group";
		formGroup.style.display = "flex"; //Чтобы было как на образце)
		formGroup.style.margin = "5px";
		form.appendChild(formGroup); //<form> <div class="form-group"> </div> </form>
		let label = document.createElement("label");
		formGroup.appendChild(label); //<div class="form-group"> <label> </label> </div>
		label.style.width = "160px";
		label.htmlFor = obj["name"];
		label.textContent = obj["label"];
		switch (obj["kind"]) {
			case "longtext": {
				let input = document.createElement("input");
				input.type = "text";
				input.name = obj["name"];
				input.style.width = "300px";
				formGroup.appendChild(input);
				break;
			}
			case "number": {
				let input = document.createElement("input");
				input.type = "text";
				input.name = obj["name"];
				input.style.width = "100px";
				formGroup.appendChild(input);
				break;
			}
			case "submit": {
				let button = document.createElement("button");
				button.type = "submit";
				button.textContent = obj["caption"];
				button.style.padding = "3px";
				label.style.width = "0"; //Чтобы кнопка была слева
				formGroup.appendChild(button);
				break;
			}
			case "shorttext": {
				let input = document.createElement("input");
				input.type = "text";
				input.name = obj["name"];
				input.style.width = "200px";
				formGroup.appendChild(input);
				break;
			}
			case "combo": {
				let select = document.createElement("select");
				select.name = obj["name"];
				select.style.width = "200px";
				for (let el of obj["variants"]) {
					let option = document.createElement("option");
					option.value = el.value;
					option.textContent = el.text;
					select.appendChild(option);
					formGroup.appendChild(select);
				}
				break;
			}
			case "radio": {
				for (let el of obj["variants"]) {
					let input = document.createElement("input");
					input.type = "radio";
					input.name = obj["name"];
					input.value = el.value;
					formGroup.appendChild(input);
					let label = document.createElement("label");
					label.style.padding = "0 10px 0 2px";
					label.htmlFor = el.value;
					label.textContent = el.text;
					formGroup.appendChild(label);
				}
				break;
			}
			case "check": {
				let input = document.createElement("input");
				input.type = "checkbox";
				input.name = obj["name"];
				formGroup.appendChild(input);
				break;
			}
			case "memo": {
				let textarea = document.createElement("textarea");
				textarea.name = obj["name"];
				formGroup.appendChild(textarea);
				break;
			}
		}
	}
	let bodyElem = document.getElementsByTagName("body"); //Присоединение формы к body
	for (let el of bodyElem) {
		el.appendChild(form);
	}
}

dyn_form(formDef1);
dyn_form(formDef2);
