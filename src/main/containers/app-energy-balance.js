import {PageEnergyBalance} from '../elements/page-energy-balance';
import {addAction} from '../store/reducers/energyBalance/actions';
import {connect} from '../store/store';
import {getActions} from '../store/reducers/energyBalance/selectors';


// noinspection JSUnusedGlobalSymbols
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
	_onTakeTrain() {
		
		this.store.dispatch(addAction({
			category: 'Transport',
			type: 'Train',
			value: 1000,
		}));
		
	}
	
	// noinspection JSUnusedGlobalSymbols
	_onTakePlane() {
		
		this.store.dispatch(addAction({
			category: 'Transport',
			type: 'Plane',
			value: 2000,
		}));
		
	}
	
	// noinspection JSUnusedGlobalSymbols
	_onWashDishes() {
		
		this.store.dispatch(addAction({
			category: 'HouseChore',
			type: 'Wash dishes',
			value: 1,
		}));
		
	}
	
	// noinspection JSUnusedGlobalSymbols
	_onToaster() {
		
		this.store.dispatch(addAction({
			category: 'HouseChore',
			type: 'Toaster',
			value: 1,
		}));
		
	}
	
	// noinspection JSUnusedGlobalSymbols
	_onLight() {
		
		this.store.dispatch(addAction({
			category: 'HouseChore',
			type: 'Light',
			value: 40,
		}));
		
	}
	
	//</editor-fold>
	
}
