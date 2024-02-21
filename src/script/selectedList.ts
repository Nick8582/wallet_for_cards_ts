import {el, mount, setChildren} from "redom";
import addCard from '/img/card.svg'
import {selectedItemEl} from "./selectedItem.ts";
import {mountModalNewCard} from "./main.ts";
import {IDataCards} from "./dataCards.ts";

export function selectedListBlock(): HTMLUListElement {
	const selectedList: HTMLUListElement = el('ul', {className: 'selected__list'})
	const selectedAddCard: HTMLButtonElement = el('button', {className: 'selected__item selected__addBtn'})
	const imageAddCard: HTMLImageElement = el('img', {className: 'selected__addImg', src: addCard})
	const textAddCard: HTMLDivElement = el('div', 'Добавть новую карту', {className: 'selected__addText'})
	
	selectedAddCard.addEventListener('click', () => {
		mountModalNewCard('')
	})
	
	console.log('Рендер')
	
	let cards = localStorage.getItem('cards')
	
	if (cards) {
		JSON.parse(cards).map((item: IDataCards) => {
			mount(selectedList, selectedItemEl(item))
		})
	}
	
	setChildren(selectedAddCard, [imageAddCard, textAddCard])
	mount(selectedList, selectedAddCard)
	
	return selectedList
}