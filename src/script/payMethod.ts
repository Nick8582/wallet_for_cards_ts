import visaImg from '/img/visa.svg';
import mastercardImg from '/img/mastercard.svg'
import americanExpress from '/img/americanExpress.svg'
import dinersClubImg from '/img/dinersClub.svg'
import discoverImg from '/img/discover.svg'
import jcbImg from '/img/jcb.svg'
import unionPayImg from '/img/unionPay.svg'
import maestroImg from '/img/maestro.svg'
import mirImg from '/img/mir.svg'
import eloImg from '/img/elo.svg'
import hiperImg from '/img/hiper.svg'
import hipercardImg from '/img/hipercard.svg'

export let imagePay: string = ''

export function payMethod(pay: string) {
	switch (pay) {
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
		case '': {
			imagePay = ''
			break
		}
	}
}