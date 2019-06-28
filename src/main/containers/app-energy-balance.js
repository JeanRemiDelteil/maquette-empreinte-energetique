import {PageEnergyBalance} from '../elements/page-energy-balance';
import {addAction} from '../store/reducers/energyBalance/actions';
import {connect} from '../store/store';
import {getActions} from '../store/reducers/energyBalance/selectors';


export class AppEnergyBalance extends connect(PageEnergyBalance) {
	
	static get is() {
		return 'app-energy-balance';
	}
	
	//<editor-fold desc="# Redux callback">
	
	// noinspection JSUnusedGlobalSymbols
	stateChanged(state) {
		this.actions = getActions(state);
	}
	
	//</editor-fold>
	
	
	//<editor-fold desc="# Listeners">
	
	// noinspection JSUnusedGlobalSymbols
	_onAddAction() {
		
		this.store.dispatch(addAction('Ride the Train for 1000km'));
		
	}
	
	//</editor-fold>
	
}
