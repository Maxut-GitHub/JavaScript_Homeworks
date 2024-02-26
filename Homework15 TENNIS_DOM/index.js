"use strict";

let body = document.getElementsByTagName(`body`)[0];

let button = document.createElement(`button`);
button.style.cssText = `width: 100px; height: 30px; margin: 0 0 20px 0; background-color: #d1d1d1;`
button.textContent = `Старт!`

let fieldEl = document.createElement(`div`);
fieldEl.style.cssText = `width: 800px; height: 400px; background-color: #c4b352; border: solid; border-color: black;`

let count = document.createElement(`div`);
count.style.cssText = `width: 100px; height: 50px; margin: 0 0 20px 0; position: absolute; left: 450px; top: 80px; font-size: 60px;
display: flex; justify-content: center; `
count.textContent = `0:0`

let greenBoard = document.createElement(`div`);
greenBoard.style.cssText = `width: 10px; height: 100px; background-color: green; position: relative; top: 130px`

let redBoard = document.createElement(`div`);
redBoard.style.cssText = `width: 10px; height: 100px; background-color: red; position: relative; left: 784px; top: 31px`




body.appendChild(button);
body.appendChild(count);
body.appendChild(fieldEl);
fieldEl.appendChild(greenBoard);
fieldEl.appendChild(redBoard);