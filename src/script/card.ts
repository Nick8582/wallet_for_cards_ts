import {el, mount, setAttr, setChildren} from "redom";
import {refrashSeletedBlock, unmountModalCard} from "./main.ts";
import Inputmask from "inputmask";
import valid from 'card-validator'
import {IDataCards} from "./dataCards.ts";
import {imagePay, payMethod} from "./payMethod.ts";

export function cardBlock(id: string) {
	const keyStorage = 'cards'
	
	let itemToStorage = localStorage.getItem('cards')
	let itemDataStorage!: IDataCards
	if (itemToStorage) {
		itemDataStorage = JSON.parse(itemToStorage).find(function (el: IDataCards) {
			return el.number === id
		})
	}
	
	let nameInput = itemDataStorage ? itemDataStorage?.name : ''
	let dataInput = itemDataStorage ? itemDataStorage.data : ''
	let numberInput = itemDataStorage ? itemDataStorage.number : ''
	let cvvInput: string = itemDataStorage ? itemDataStorage.cvv : ""
	let pay = itemDataStorage ? itemDataStorage.pay : ""
	
	const maskNumber = Inputmask('9999 9999 9999 9999 [99]')
	const maskData = Inputmask('99/99')
	const maskCVV = Inputmask('999')
	
	const cardSection = el('section', {className: 'card'})
	const cardModal = el('div', {className: 'card__modal'})
	const cardVisual = el('div', {className: 'card__visual'})
	const cardBlock = el('div', {className: 'card__block'})
	const cardContent = el('div', {className: 'card__content'})
	const cardData = el('div', {className: 'card__data'})
	const cardHead = el('div', {className: 'card__head'})
	const cardName = el('span', nameInput, {className: 'card__name'})
	const cardDate = el('span', dataInput, {className: 'card__date'})
	const cardNumber = el('p', numberInput, {className: 'card__number'})
	payMethod('')
	const cardPay = el('img', {className: 'card__pay', src: imagePay})
	
	setChildren(cardHead, [cardName, cardDate])
	setChildren(cardData, [cardHead, cardNumber])
	mount(cardContent, cardData)
	setChildren(cardBlock, [cardContent, cardPay])
	mount(cardVisual, cardBlock)
	
	const cardForm = el('div', {className: 'card__form form'})
	const form = el('form', {className: 'form__block'})
	const formInputs = el('div', {className: 'form__inputs'})
	const formBtns = el('div', {className: 'form__buttons'})
	
	const formNameLabel = el('label', {className: 'form__input'})
	const formNameSpan = el('label', 'Фамилия Имя')
	const formNameInput = el('input', {type: 'text', value: nameInput})
	setChildren(formNameLabel, [formNameSpan, formNameInput])
	
	formNameInput.addEventListener("keyup", (e) => {
		const target = e.target as HTMLInputElement;
		if (!e.key.match(/[A-Z]/)) {
		} else {
			return e.preventDefault();
		}
		nameInput = target.value
		cardName.textContent = nameInput
	})
	
	formNameInput.addEventListener('input',  (e) => {
		const target = e.target as HTMLInputElement;
		
		formNameInput.value = formNameInput.value.replace(/[0-9()-+!@#$%^&*_]/g, "");
		nameInput = target.value
		cardName.textContent = nameInput
	});
	
	const formDataLabel = el('label', {className: 'form__input'})
	const formDataSpan = el('label', 'Дата')
	const formDataInput = el('input', {type: 'text', value: dataInput})
	setChildren(formDataLabel, [formDataSpan, formDataInput])
	
	maskData.mask(formDataInput)
	
	formDataInput.addEventListener('keyup', (e) => {
		const target = e.target as HTMLInputElement;
		let datesMY: string[] = target.value.split('/')
		let mount: string | number = datesMY[0]
		let year: string | number = datesMY[1]
		let yearDevice: string | number = Number(new Date().getFullYear().toString().slice(-2))
		mount = Number(mount.replace('_', ''))
		if(year !== undefined) {
			year = Number(year.replace('_', ''))
		}
		
		if(mount <= 12 && year >= yearDevice) {
			setAttr(formDataInput, {className: ''})
		} else {
			setAttr(formDataInput, {className: 'error'})
		}
		
		dataInput = target.value
		cardDate.textContent = dataInput
	})
	
	const formNumberLabel = el('label', {className: 'form__input'})
	const formNumberSpan = el('label', 'Номер карты')
	const formNumberInput = el('input', {type: 'text', value: numberInput})
	setChildren(formNumberLabel, [formNumberSpan, formNumberInput])
	
	const validationNumberCard = (inp: string) => {
		let numberValidation = valid.number(inp.trim().replace(/_/g, ""));
		
		if (!numberValidation.isPotentiallyValid) {
			payMethod(pay)
			setAttr(formNumberInput, {className: 'error'})
			setAttr(cardPay, {src: imagePay})
		} else {
			setAttr(formNumberInput, {className: ''})
			if (numberValidation.card !== null) {
				console.log(numberValidation)
				pay = numberValidation.card.niceType
				payMethod(pay)
				setAttr(formNumberInput, {className: ''})
				setAttr(cardPay, {src: imagePay})
			}
		}
		maskNumber.mask(formNumberInput)
		cardNumber.textContent = formNumberInput.value
	}
	
	validationNumberCard(numberInput)
	
	formNumberInput.addEventListener('input', (e) => {
		const target = e.target as HTMLInputElement;
		numberInput = target.value
		validationNumberCard(numberInput)
	})
	
	const formCVVLabel = el('label', {className: 'form__input'})
	const formCVVSpan = el('label', 'CVV')
	const formCVVInput = el('input', {type: 'password', value: cvvInput})
	setChildren(formCVVLabel, [formCVVSpan, formCVVInput])
	
	maskCVV.mask(formCVVInput)
	
	formCVVInput.addEventListener('input', (e) => {
		const target = e.target as HTMLInputElement;
		cvvInput = target.value
	})
	
	const formCancel = el('button', 'Отмена', {className: 'form__cancel', type: 'button'})
	const formSave = el('button', 'Сохранить', {className: 'form__save', type: 'submit'})
	
	formCancel.addEventListener('click', (e) => {
		e.preventDefault()
		unmountModalCard()
	})
	
	const save = () => {
		let dataCard: IDataCards = {
			pay: pay, number: numberInput.replace(/\s/g, ""), data: dataInput, cvv: cvvInput, name: nameInput
		}
		if (localStorage.getItem(keyStorage) === null) {
			localStorage.setItem('cards', JSON.stringify([dataCard]))
			unmountModalCard()
			refrashSeletedBlock(true)
		} else {
			let storage = localStorage.getItem(keyStorage)
			if (storage === null) {
				alert('Прошла не предвиденная ошибка')
				return
			}
			if (JSON.parse(storage).some((item: IDataCards) => item.number === dataCard.number)) {
				console.log('Повторяемся')
				return;
			} else {
				let oldData = JSON.parse(storage)
				oldData.push(dataCard)
				localStorage.setItem(keyStorage, JSON.stringify(oldData))
				unmountModalCard()
				refrashSeletedBlock(true)
			}
		}
	}
	
	formSave.addEventListener('click', (e) => {
		e.preventDefault()
		save()
	})
	
	setChildren(formBtns, [formCancel, formSave])
	setChildren(formInputs, [formNameLabel, formDataLabel, formNumberLabel, formCVVLabel])
	setChildren(form, [formInputs, formBtns])
	mount(cardForm, form)
	setChildren(cardModal, [cardVisual, cardForm])
	mount(cardSection, cardModal)
	return cardSection
}