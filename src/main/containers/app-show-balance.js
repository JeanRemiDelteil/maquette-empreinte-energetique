import {PageShowBalance} from '../elements/page-show-balance';
import {connect} from '../store/store';


export class AppShowBalance extends connect(PageShowBalance) {
	
	static get is() {
		return 'app-show-balance';
	}
	
	//<editor-fold desc="# Redux callback">
	
	// noinspection JSUnusedGlobalSymbols
	stateChanged(state) {
		
	}
	
	//</editor-fold>
	
}
