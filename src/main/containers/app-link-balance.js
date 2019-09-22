import {connect} from '../store/store';
import {getBalance, getBalanceId} from '../store/reducers/energyBalance/selectors';
import {PageLinkBalance} from '../elements/page-link-balance';


export class AppLinkBalance extends connect(PageLinkBalance) {
	
	static get is() {
		return 'app-link-balance';
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
		
	}
	
	//</editor-fold>
	
}
