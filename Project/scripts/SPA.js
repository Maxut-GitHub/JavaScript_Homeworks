
//временно
let nickName = `10_SYMBOLS_NAME`;
let killCount = 999;
let roomPast = 99;


// в закладке УРЛа будем хранить разделённые подчёркиваниями слова
// #MainMenu - главное меню
// #Records - рекорды
// #Game - сама игра

// отслеживаем изменение закладки в УРЛе
// оно происходит при любом виде навигации
// в т.ч. при нажатии кнопок браузера ВПЕРЁД/НАЗАД
window.onhashchange = switchToStateFromURLHash;

// текущее состояние приложения
// это Model из MVC
var SPAState = {};

// вызывается при изменении закладки УРЛа
// а также при первом открытии страницы
// читает новое состояние приложения из закладки УРЛа
// и обновляет ВСЮ вариабельную часть веб-страницы
// соответственно этому состоянию
// это упрощённая реализация РОУТИНГА - автоматического выполнения нужных
// частей кода в зависимости от формы URLа
// "роутинг" и есть "контроллер" из MVC - управление приложением через URL
function switchToStateFromURLHash() {
	var URLHash = window.location.hash;
	// убираем из закладки УРЛа решётку
	var stateStr = URLHash.substr(1);

	if (stateStr != "") { // если закладка непустая, читаем из неё состояние и отображаем
		var parts = stateStr.split("_")
		SPAState = { pagename: parts[0] }; // первая часть закладки - номер страницы
	}
	else
		SPAState = { pagename: 'MainMenu' }; // иначе показываем главную страницу

	console.log('Новое состояние приложения:');
	console.log(SPAState);

	// обновляем вариабельную часть страницы под текущее состояние
	// это реализация View из MVC - отображение состояния модели в HTML-код
	var pageHTML = "";

	let scriptsAndOther = [];
	switch (SPAState.pagename) {
		case 'MainMenu':
			pageHTML = ``;
			let mainMenu = document.createElement('div');
			mainMenu.classList = "main-menu";

			let startGame = document.createElement('button');
			startGame.classList = `main-menu__button`;
			startGame.textContent = `Начать игру`;
			startGame.onclick = function () { switchToGamePage(); location.reload() };
			mainMenu.appendChild(startGame);

			let records = document.createElement('button');
			records.classList = `main-menu__button`;
			records.textContent = `Таблица рекордов`;
			records.onclick = switchToRecordsPage;
			mainMenu.appendChild(records);
			document.getElementById('Page').innerHTML = pageHTML;
			document.getElementById('Page').appendChild(mainMenu)
			break;
		case 'Records':
			pageHTML += `<div class="records-section">
			<div class="records-section__name">Таблица рекордов</div>
			<div class="records-section__table">
				<div class="records-section__slot">1. `+ nickName + ` (` + killCount + `kills) (` + roomPast + `room)</div>
				<div class="records-section__slot">2. `+ nickName + ` (` + killCount + `kills) (` + roomPast + `room)</div>
				<div class="records-section__slot">3. `+ nickName + ` (` + killCount + `kills) (` + roomPast + `room)</div>
				<div class="records-section__slot">4. `+ nickName + ` (` + killCount + `kills) (` + roomPast + `room)</div>
				<div class="records-section__slot">5. `+ nickName + ` (` + killCount + `kills) (` + roomPast + `room)</div>
				<div class="records-section__slot">6. `+ nickName + ` (` + killCount + `kills) (` + roomPast + `room)</div>
				<div class="records-section__slot">7. `+ nickName + ` (` + killCount + `kills) (` + roomPast + `room)</div>
				<div class="records-section__slot">8. `+ nickName + ` (` + killCount + `kills) (` + roomPast + `room)</div>
				<div class="records-section__slot">9. `+ nickName + ` (` + killCount + `kills) (` + roomPast + `room)</div>
				<div class="records-section__slot">10. `+ nickName + ` (` + killCount + ` kills) (` + roomPast + ` room)</div>
			</div>
		</div>
		<div class="description">Автор выпускного проекта: ЖЖЖЖЖЖЖ ЖЖЖЖЖЖЖЖ. Группа Md-FD2-140-23.<br> Преподаватель: ЖЖЖЖЖЖЖ ЖЖЖЖЖЖ.<br>
		</div>`;
			let exitRecords = document.createElement('button');
			exitRecords.classList = `exitRecordsButton`;
			exitRecords.textContent = `Назад`;
			exitRecords.onclick = function () { switchToMainMenuPage(); };
			document.getElementById('Page').innerHTML = pageHTML;
			document.getElementById('Page').insertBefore(exitRecords, document.getElementsByClassName(`records-section`)[0]);
			break;
		case 'Game':
			pageHTML += `<div id="levelText">level
			<span id="level">1</span>
		</div>
		<div id="gameField">
			<div id="room">
				<div id="doorTop"></div>
				<div id="floor"></div>
				<div id="doorButton"></div>
			</div>
			<div class="interface">
				<div id="lifePanel" class="interface__panel">
					<div id="healsbar" class="interface__healsbar">
						<div id="HP"></div>
						<div id="HPcount"></div>
					</div>
					<div id="lifeText" class="interface__text">Здоровье</div>
				</div>
				<div id="weaponPanel" class="interface__panel">
					<div id="weaponSlot" class="interface__slot"></div>
					<div id="weaponText" class="interface__text">Оружие</div>
				</div>
				<div id="bootsPanel" class="interface__panel">
					<div id="bootsSlot" class="interface__slot"></div>
					<div id="bootsText" class="interface__text">Сапоги</div>
				</div>
				<div id="bodyArmorPanel" class="interface__panel">
					<div id="bodyArmorSlot" class="interface__slot"></div>
					<div id="bodyArmorText" class="interface__text">Нагрудник</div>
				</div>
				<div id="helmetPanel" class=" interface__panel">
					<div id="helmetSlot" class="interface__slot"></div>
					<div id="helmetText" class="interface__text">Шлем</div>
				</div>
				<div id="menuPanel" class="interface__panel">
					<button id="menuButton">Меню</button>
				</div>
			</div>
		</div>`;
			let ModelScript = document.createElement('script');
			ModelScript.type = "module";
			ModelScript.src = "scripts/model.js";
			scriptsAndOther.push(ModelScript);
			let ControllerScript = document.createElement('script');
			ControllerScript.type = "module";
			ControllerScript.src = "scripts/controller.js";
			scriptsAndOther.push(ControllerScript);
			let ViewScript = document.createElement('script');
			ViewScript.type = "module";
			ViewScript.src = "scripts/view.js";
			scriptsAndOther.push(ViewScript);
			//Добавляем все на страницу и отдельно в for скрипты
			document.getElementById('Page').innerHTML = pageHTML;
			for (let el of scriptsAndOther) {
				document.getElementById('Page').appendChild(el);
			}
			break;
	}
}


// устанавливает в закладке УРЛа новое состояние приложения
// и затем устанавливает+отображает это состояние
function switchToState(newState) {
	// устанавливаем закладку УРЛа
	// нужно для правильной работы кнопок навигации браузера
	// (т.к. записывается новый элемент истории просмотренных страниц)
	// и для возможности передачи УРЛа другим лицам
	var stateStr = newState.pagename;
	location.hash = stateStr;
	// АВТОМАТИЧЕСКИ вызовется switchToStateFromURLHash()
	// т.к. закладка УРЛа изменилась (ЕСЛИ она действительно изменилась)
}


function switchToMainMenuPage() {
	switchToState({ pagename: 'MainMenu' });
}

function switchToRecordsPage() {
	switchToState({ pagename: 'Records' });
}

function switchToGamePage() {
	switchToState({ pagename: 'Game' });
}

// переключаемся в состояние, которое сейчас прописано в закладке УРЛ
switchToStateFromURLHash();

let body = document.getElementsByTagName(`body`)[0];
let page = document.getElementById(`Page`);

//ПРОВЕРКА НА ОРИЕНТАЦИЮ ЭКРАНА ДЛЯ МОБИЛЬНЫХ УСТРООЙСТВ (при просьбе перевернуть экран - вызывается меню)
window.addEventListener(`orientationchange`, orientationMobileChange);
//Темное модальнео стекло с сообщением перевернуть экран
let orientationModalGlass = document.createElement(`div`);
orientationModalGlass.style.cssText = `position: fixed; width: 100%; height: 100%; background-color: black; z-index: 7; color: white;
font-size: 8vw; display: flex; justify-content: center; align-items: center; top: 0`
orientationModalGlass.id = `orientationModalGlass`
orientationModalGlass.textContent = `Переверните экран`
function orientationMobileChange() {
	if (window.matchMedia('(orientation: landscape)').matches) {
		body.appendChild(orientationModalGlass);
	} else {
		if (document.getElementById(`orientationModalGlass`)) {
			orientationModalGlass.remove()
		}
	}
}
if (window.matchMedia('(orientation: landscape)').matches) {
} else {
	body.appendChild(orientationModalGlass);
}