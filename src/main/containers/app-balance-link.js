import {connect} from '../store/store';
import {getBalance, getBalanceId} from '../store/reducers/energyBalance/selectors';
import {PageBalanceLink} from '../elements/page-balance-link';


export class AppBalanceLink extends connect(PageBalanceLink) {
	
	static get is() {
		return 'app-balance-link';
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
