import {connect} from '../store/store';
import {PageEditBalance} from '../elements/page-edit-balance';
import {getBalance, getBalanceId, getBalanceInputs} from '../store/reducers/energyBalance/selectors';
import {balance_addInput} from '../store/reducers/energyBalance/actions';
import {baseDataLoad} from '../store/reducers/baseData/actions';
import {selectBaseData} from '../store/reducers/baseData/selectors';


export class AppEditBalance extends connect(PageEditBalance) {
	
	static get is() {
		return 'app-edit-balance';
	}
	
	constructor() {
		super();
		
		this.inputData = {};
		
		// Init base data
		this.store.dispatch(baseDataLoad());
	}
	
	
	//<editor-fold desc="# Redux callback">
	
	// noinspection JSUnusedGlobalSymbols
	stateChanged(state) {
		this.balance = getBalance(state);
		this.id = getBalanceId(this.balance);
		
		this.baseData = selectBaseData(state);
		
		this.inputsList = getBalanceInputs(this.balance);
	}
	
	//</editor-fold>
	
	
	_on_AddInput(input) {
		this.store.dispatch(balance_addInput(input));
	}
	
}
