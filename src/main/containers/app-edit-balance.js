import {connect} from '../store/store';
import {PageEditBalance} from '../elements/page-edit-balance';
import {getBalance, getBalanceId} from '../store/reducers/energyBalance/selectors';


export class AppEditBalance extends connect(PageEditBalance) {
	
	static get is() {
		return 'app-edit-balance';
	}
	
	
	//<editor-fold desc="# Redux callback">
	
	// noinspection JSUnusedGlobalSymbols
	stateChanged(state) {
		this.balance = getBalance(state);
		this.id = getBalanceId(this.balance);
	}
	
	//</editor-fold>
	
}
