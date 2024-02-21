import {el, mount, setAttr, setChildren} from "redom";
import {IDataCards} from "./dataCards.ts";
import {clickItemCard} from "./main.ts";
import visaImg from '/img/visaBlack.svg';
import mastercardImg from '/img/mastercard.svg'
import americanExpress from '/img/americanExpressBlack.svg'
import dinersClubImg from '/img/dinersClubBlack.svg'
import discoverImg from '/img/discover.svg'
import jcbImg from '/img/jcb.svg'
import unionPayImg from '/img/unionPay.svg'
import maestroImg from '/img/maestro.svg'
import mirImg from '/img/mirBlack.svg'
import eloImg from '/img/eloBlack.svg'
import hiperImg from '/img/hiper.svg'
import hipercardImg from '/img/hipercard.svg'

export function selectedItemEl(item: IDataCards): HTMLLIElement {
	const selectedItem: HTMLLIElement = el('li', {className: 'selected__item'})
	const selectedContent: HTMLDivElement = el('div', {className: 'selected__content'})
	const selectedHead: HTMLDivElement = el('div', {className: 'selected__contentHead'})
	const selectedBottom: HTMLDivElement = el('div', {className: 'selected__contentBottom'})
	const SelectedCheck: HTMLSpanElement = el('span', {className: 'selected__check'})
	const selectedDivImgPay: HTMLDivElement = el('div', {className: 'selected__imgPay'})
	let imagePay: string = ''
	switch (item.pay) {
		case 'Visa': {
			imagePay = visaImg
			break
		}
		case 'Mastercard': {
			imagePay = mastercardImg
			break
		}
		case 'American Express': {
			imagePay = americanExpress
			break
		}
		case 'Diners Club': {
			imagePay = dinersClubImg
			break
		}
		case 'Discover': {
			imagePay = discoverImg
			break
		}
		case 'JCB': {
			imagePay = jcbImg
			break
		}
		case 'UnionPay': {
			imagePay = unionPayImg
			break
		}
		case 'Maestro': {
			imagePay = maestroImg
			break
		}
		case 'Mir': {
			imagePay = mirImg
			break
		}
		case 'Elo': {
			imagePay = eloImg
			break
		}
		case 'Hiper': {
			imagePay = hiperImg
			break
		}
		case 'Hipercard': {
			imagePay = hipercardImg
			break
		}
	}
	const selectedImgPay: HTMLImageElement = el('img', {src: imagePay})
	let numberCard = (item: string): string => {
		if (item.length === 16) {
			return `XXXX XXXX XXXX ${item.slice(-4)}`
		} else if (item.length === 18) {
			return `XXXX XXXX XXXX ${item.slice(-6, -2)} ${item.slice(-2)}`
		}
		return 'Ошибка данных'
	}
	const selectedCard: HTMLParagraphElement = el('p', numberCard(item.number), {className: 'selected__card'})
	const selectedData: HTMLDivElement = el('div', 'Дата', {className: 'selected__data'})
	const selectedDataNum: HTMLDivElement = el('div', item.data, {className: 'selected__dataNumb'})
	
	selectedItem.addEventListener('click', () => {
		const functionProps = clickItemCard(item.number)
		setAttr(selectedItem, {className: `selected__item ${functionProps === Number(item.number) && 'active'}`})
	})
	
	mount(selectedDivImgPay, selectedImgPay)
	setChildren(selectedHead, [selectedDivImgPay, selectedCard])
	setChildren(selectedBottom, [selectedData, selectedDataNum])
	setChildren(selectedContent, [selectedHead, selectedBottom, SelectedCheck])
	mount(selectedItem, selectedContent)
	
	return selectedItem
}