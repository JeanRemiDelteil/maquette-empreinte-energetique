import {connect} from '../store/store';
import {PageMain} from '../elements/page-main';


export class AppMain extends connect(PageMain) {
	
	static get is() {
		return 'app-main';
	}
	
}
