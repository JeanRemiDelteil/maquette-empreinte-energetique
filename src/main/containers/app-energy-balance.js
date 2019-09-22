import {html, LitElement} from 'lit-element';

import {connect, store} from '../store/store';
import {loadBalance} from '../store/reducers/energyBalance/actions';
import {getLocationPath} from '../store/reducers/router/selectors';
import {Router} from '../lib/router/Router';
import {getBalance, getBalanceId} from '../store/reducers/energyBalance/selectors';


// Define Router only once (not on every element creation)
const router = new Router([
	{
		name: 'Link',
		pattern: /^\/empreinte-energie\/([^/]+)\/lien$/,
		
		load: (route, path) => {
			const [, id] = route.pattern.exec(path) || [];
			id
			&& id !== getBalanceId(getBalance(store.getState()))
			&& store.dispatch(loadBalance(id));
			
			return html`<app-link-balance></app-link-balance>`;
		},
		importLazy: () => import('../containers/app-link-balance'),
	},
	{
		name: 'Edit',
		pattern: /^\/empreinte-energie\/([^/]+)\/modifier$/,
		
		load: (route, path) => {
			const [, id] = route.pattern.exec(path) || [];
			id
			&& id !== getBalanceId(getBalance(store.getState()))
			&& store.dispatch(loadBalance(id));
			
			return html`<app-edit-balance></app-edit-balance>`;
		},
		importLazy: () => import('../containers/app-edit-balance'),
	},
	{
		name: 'Graphs',
		pattern: /^\/empreinte-energie\/([^/]+)\/graphiques$/,
		
		load: (route, path) => {
			const [, id] = route.pattern.exec(path) || [];
			id
			&& id !== getBalanceId(getBalance(store.getState()))
			&& store.dispatch(loadBalance(id));
			
			return html`<app-show-balance></app-show-balance>`;
		},
		importLazy: () => import('../containers/app-show-balance'),
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
