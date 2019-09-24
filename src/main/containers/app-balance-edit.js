import {connect} from '../store/store';
import {PageBalanceEdit} from '../elements/page-balance-edit';
import {getBalance, getBalanceId, getBalanceInputs} from '../store/reducers/energyBalance/selectors';
import {balance_addInput, balance_deleteRef} from '../store/reducers/energyBalance/actions';
import {baseDataLoad} from '../store/reducers/baseData/actions';
import {selectBaseData} from '../store/reducers/baseData/selectors';
import {getSeriesData, processAggregates} from '../lib/dataConverter';

let baseDataLoaded = false;

export class AppBalanceEdit extends connect(PageBalanceEdit) {
	
	static get is() {
		return 'app-balance-edit';
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
		
		// compute kWh
		const aggregates = processAggregates(this.inputsList, [/*'activity',*/ 'category', 'subCategory']);
		const series = getSeriesData(aggregates, [], {useDrillDown: false});
		
		this.seriesKWH = series.kW.main;
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
