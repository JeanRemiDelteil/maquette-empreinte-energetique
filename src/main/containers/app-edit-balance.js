import {connect} from '../store/store';
import {PageEditBalance} from '../elements/page-edit-balance';
import {getBalance, getBalanceId, getBalanceInputs} from '../store/reducers/energyBalance/selectors';
import {balance_addInput} from '../store/reducers/energyBalance/actions';


export class AppEditBalance extends connect(PageEditBalance) {
	
	static get is() {
		return 'app-edit-balance';
	}
	
	constructor() {
		super();
		
		this.inputs = [
			'Train',
			'Avion',
			'Lave-vaisselle',
			'Ampoule',
		];
	}
	
	
	//<editor-fold desc="# Redux callback">
	
	// noinspection JSUnusedGlobalSymbols
	stateChanged(state) {
		this.balance = getBalance(state);
		this.id = getBalanceId(this.balance);
		
		this.inputsList = getBalanceInputs(this.balance);
	}
	
	//</editor-fold>
	
	
	_on_AddInput(input) {
		this.store.dispatch(balance_addInput(input));
	}
	
}
