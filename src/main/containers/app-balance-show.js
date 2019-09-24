import {PageBalanceShow} from '../elements/page-balance-show';
import {connect} from '../store/store';
import {getBalance, getBalanceId, getBalanceInputs} from '../store/reducers/energyBalance/selectors';
import {getDrilldownData, processAggregates} from '../lib/dataConverter';

// Source: https://jancovici.com/transition-energetique/l-energie-et-nous/combien-suis-je-un-esclavagiste/
const COEF_SLAVES = 1919;
const NATIONAL_MEAN = 8100;

export class AppBalanceShow extends connect(PageBalanceShow) {
	
	static get is() {
		return 'app-balance-show';
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
		
		this.aggregates = processAggregates(this.inputsList, [/*'activity',*/ 'category', 'subCategory']);
		this.series = getDrilldownData(this.aggregates, []);
		
		this.seriesKW = this.series.kW;
		
		this.numberSlaves = this.aggregates.values.kW / COEF_SLAVES;
		
		this.totalConsumption = this.aggregates.values.kW;
		this.consumptionNationalMean = NATIONAL_MEAN;
		
		// no CO2 for now
	}
	
	//</editor-fold>
	
}
