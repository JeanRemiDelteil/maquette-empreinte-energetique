import {PageShowBalance} from '../elements/page-show-balance';
import {connect} from '../store/store';
import {getBalance, getBalanceId, getBalanceInputs} from '../store/reducers/energyBalance/selectors';


export class AppShowBalance extends connect(PageShowBalance) {
	
	static get is() {
		return 'app-show-balance';
	}
	
	constructor() {
		super();
		
		this._old_balance = null;
	}
	
	//<editor-fold desc="# Redux callback">
	
	// noinspection JSUnusedGlobalSymbols
	stateChanged(state) {
		this.balance = getBalance(state);
		if (this.balance === this._old_balance) return;
		this._old_balance = this.balance;
		
		this.id = getBalanceId(this.balance);
		this.inputsList = getBalanceInputs(this.balance);
	}
	
	//</editor-fold>
	
}
