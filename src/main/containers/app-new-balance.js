import {connect} from '../store/store';
import {PageNewBalance} from '../elements/page-new-balance';
import {create} from '../store/reducers/energyBalance/actions';


export class AppNewBalance extends connect(PageNewBalance) {
	
	static get is() {
		return 'app-new-balance';
	}
	
	
	_onStart() {
		this.store.dispatch(create());
	}
	
}
