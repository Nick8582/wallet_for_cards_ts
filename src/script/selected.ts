import {el, setChildren} from "redom";
import {selectedListBlock} from "./selectedList.ts";
import {clickSelect} from "./main.ts";

export function selectedBlock(): HTMLElement {
	const selectedSection: HTMLElement = el('section', {className: 'selected'})
	const selectedTitle: HTMLHeadingElement = el('h1', 'Выберите свой способ оплаты', {className: 'selected__title'})
	const selectedSubmit: HTMLButtonElement = el('button', 'Выбрать', {className: 'selected__submit disabled'})
	
	selectedSubmit.addEventListener('click', () => {
		clickSelect()
	})
	
	setChildren(selectedSection, [selectedTitle, selectedListBlock(),  selectedSubmit])
	return selectedSection
}