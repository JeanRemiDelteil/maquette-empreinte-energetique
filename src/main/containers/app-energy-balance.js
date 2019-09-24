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
			
			return html`<app-balance-link></app-balance-link>`;
		},
		importLazy: () => import('./app-balance-link'),
	},
	{
		name: 'Edit',
		pattern: /^\/empreinte-energie\/([^/]+)\/modifier$/,
		
		load: (route, path) => {
			const [, id] = route.pattern.exec(path) || [];
			id
			&& id !== getBalanceId(getBalance(store.getState()))
			&& store.dispatch(loadBalance(id));
			
			return html`<app-balance-edit></app-balance-edit>`;
		},
		importLazy: () => import('./app-balance-edit'),
	},
	{
		name: 'Graphs',
		pattern: /^\/empreinte-energie\/([^/]+)\/graphiques$/,
		
		load: (route, path) => {
			const [, id] = route.pattern.exec(path) || [];
			id
			&& id !== getBalanceId(getBalance(store.getState()))
			&& store.dispatch(loadBalance(id));
			
			return html`<app-balance-show></app-balance-show>`;
		},
		importLazy: () => import('./app-balance-show'),
	},
	{
		name: 'Create',
		pattern: /^\/empreinte-energie(?:\/.*)?$/,
		
		load: () => html`<app-balance-new></app-balance-new>`,
		importLazy: () => import('./app-balance-new'),
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
