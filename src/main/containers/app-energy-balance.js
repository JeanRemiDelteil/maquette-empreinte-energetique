import {connect} from '../store/store';
import {getLocationPath} from '../store/reducers/router/selectors';
import {Router} from '../lib/router/Router';
import {html, LitElement} from 'lit-element';


// Define Router only once (not on every element creation)
const router = new Router([
	{
		name: 'Edit',
		pattern: /^\/empreinte-energie\/([^/]+)\/modifier$/,
		
		load: () => html`<app-edit-balance></app-edit-balance>`,
		importLazy: () => import('../containers/app-edit-balance'),
	},
	{
		name: 'Create',
		pattern: /^\/empreinte-energie(?:\/.*)?$/,
		
		load: () => html`<app-new-balance></app-new-balance>`,
		importLazy: () => import('../containers/app-new-balance'),
	},
]);


export class AppEnergyBalance extends connect(LitElement) {
	
	static get is() {
		return 'app-energy-balance';
	}
	
	static get properties() {
		return {
			route: {
				type: Object,
			},
		};
	}
	
	
	constructor() {
		super();
		
		this._router = router;
	}
	
	
	//<editor-fold desc="# Redux callback">
	
	// noinspection JSUnusedGlobalSymbols
	stateChanged(state) {
		this.route = this._router.process(getLocationPath(state));
	}
	
	//</editor-fold>
	
	render() {
		return html`
<style>
	:host{
		display: flex;
		width: 100%;
	}
	
	main {
		display: flex;
		width: 100%;
	}
</style>

<main>
	${this.route || ''}
</main>
`;
		
	}
}
