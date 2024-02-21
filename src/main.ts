import './scss/main.scss'
import {mount} from "redom";
import {mainBlock} from "./script/main.ts";

(function () {
	const app: HTMLDivElement | null = document.querySelector('#app')
	
	if(app !== null) {
		mount(app, mainBlock())
	} else {
		console.log('Ошибка скрипт не нашел блок монтирования')
	}
}());