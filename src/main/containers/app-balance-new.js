import {connect} from '../store/store';
import {PageBalanceNew} from '../elements/page-balance-new';
import {create} from '../store/reducers/energyBalance/actions';


export class AppBalanceNew extends connect(PageBalanceNew) {
	
	static get is() {
		return 'app-balance-new';
	}
	
	
	_onStart() {
		this.store.dispatch(create());
	}
	
}
