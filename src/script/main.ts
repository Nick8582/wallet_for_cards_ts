import {el, mount, unmount} from "redom";
import {selectedBlock} from "./selected.ts";
import {cardBlock} from "./card.ts";

let idSelect: number | null = null;

export const clickItemCard = (id: string | null): number | null => {
	const listItems = document.querySelectorAll('li.selected__item')
	const selectedSubmit = document.querySelector('.selected__submit')
	idSelect = Number(id)
	if (listItems.length !== 0) {
		listItems.forEach((item) => {
			item.classList.remove('active')
		})
	}
	if (selectedSubmit) {
		idSelect != null ? selectedSubmit.classList.remove('disabled') : selectedSubmit.classList.add('disabled')
	}
	return idSelect
}

export const clickSelect = () => {
	if (idSelect === null) {
		return
	}
	mountModalNewCard(idSelect.toString())
}

const mainContainer = el('div', {className: 'container main__container'})

export const refrashSeletedBlock = (bol?: boolean) => {
	if (bol) {
		setTimeout(() => {
			let selectedEl = document.querySelector('.selected')
			if (selectedEl !== null) {
				unmount(mainContainer, selectedEl)
			}
			mount(mainContainer, selectedBlock())
		}, 1000)
		
	} else {
		mount(mainContainer, selectedBlock())
	}
}

export function mountModalNewCard(id: string) {
	clickItemCard(null)
	const cardBlockEl = document.querySelector('.card')
	if (cardBlockEl) return
	mount(mainContainer, cardBlock(id))
}

export function unmountModalCard() {
	const cardBlockEl = document.querySelector('.card')
	if (cardBlockEl) {
		const cardModal = cardBlockEl.querySelector('.card__modal')
		
		if (cardModal) {
			cardModal.classList.add('unmount')
		}
		setTimeout(() => {
				unmount(mainContainer, cardBlockEl)
			}, 1000
		)
	}
}

export function mainBlock(): HTMLElement {
	const main = el('main', {className: 'main'})
	refrashSeletedBlock()
	mount(main, mainContainer)
	return main
}