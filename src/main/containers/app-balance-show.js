import {PageBalanceShow} from '../elements/page-balance-show';
import {connect} from '../store/store';
import {getBalance, getBalanceId, getBalanceInputs} from '../store/reducers/energyBalance/selectors';
import {getSeriesData, processAggregates} from '../lib/dataConverter';
import {selectConfigData} from '../store/reducers/baseData/selectors';
import {baseDataConfigLoad} from '../store/reducers/baseData/actions';

let configDataLoaded = false;

export class AppBalanceShow extends connect(PageBalanceShow) {
	
	static get is() {
		return 'app-balance-show';
	}
	
	constructor() {
		super();
		
		this._old_balance = null;
		this.configData = {};
		
		// Init config data
		!configDataLoaded && this.store.dispatch(baseDataConfigLoad());
	}
	
	//<editor-fold desc="# Redux callback">
	
	// noinspection JSUnusedGlobalSymbols
	stateChanged(state) {
		this.balance = getBalance(state);
		if (this.balance === this._old_balance && configDataLoaded) return;
		this._old_balance = this.balance;
		
		if (!configDataLoaded) {
			this.configData = selectConfigData(state);
			
			configDataLoaded = Object.keys(this.configData).length !== 0;
		}
		
		this.id = getBalanceId(this.balance);
		this.inputsList = getBalanceInputs(this.balance);
		
		const aggregates = processAggregates(this.inputsList, [/*'activity',*/ 'category', 'subCategory']);
		const series = getSeriesData(aggregates, []);
		
		// no CO2 for now
		this.seriesKW = series.kW;
		
		// Source: https://jancovici.com/transition-energetique/l-energie-et-nous/combien-suis-je-un-esclavagiste/
		this.numberSlaves = aggregates.values.kW / this.configData.COEF_SLAVES || 0;
		
		this.totalConsumption = aggregates.values.kW;
		this.consumptionNationalMean = this.configData.NATIONAL_MEAN;
		
	}
	
	//</editor-fold>
	
}
