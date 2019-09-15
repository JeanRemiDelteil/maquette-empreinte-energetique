import {connect} from '../store/store';
import {PageEditBalance} from '../elements/page-edit-balance';
import {getBalance, getBalanceId, getBalanceInputs} from '../store/reducers/energyBalance/selectors';
import {balance_addInput, balance_deleteRef} from '../store/reducers/energyBalance/actions';
import {baseDataLoad} from '../store/reducers/baseData/actions';
import {selectBaseData} from '../store/reducers/baseData/selectors';

let baseDataLoaded = false;

export class AppEditBalance extends connect(PageEditBalance) {
	
	static get is() {
		return 'app-edit-balance';
	}
	
	constructor() {
		super();
		
		// Init base data
		!baseDataLoaded && this.store.dispatch(baseDataLoad());
	}
	
	
	//<editor-fold desc="# Redux callback">
	
	// noinspection JSUnusedGlobalSymbols
	stateChanged(state) {
		this.balance = getBalance(state);
		this.id = getBalanceId(this.balance);
		
		this.baseData = selectBaseData(state);
		baseDataLoaded = !!this.baseData;
		
		this.inputsList = getBalanceInputs(this.balance);
	}
	
	//</editor-fold>
	
	
	/**
	 * @param {IConsumptionRef} ref
	 */
	addSelection(ref) {
		this.store.dispatch(balance_addInput(this.id, ref));
	}
	
	/**
	 * @param {string} itemId
	 */
	deleteBalanceItem(itemId) {
		this.store.dispatch(balance_deleteRef(this.id, itemId));
	}
	
}
