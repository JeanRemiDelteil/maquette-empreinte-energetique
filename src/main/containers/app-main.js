import {html, LitElement} from 'lit-element';
import {connect} from '../store/store';
import {installRouter} from 'pwa-helpers/router';
import {navigateTo} from '../store/reducers/router/actions';
import {getLocationPath} from '../store/reducers/router/selectors';
import {Router} from '../lib/router/Router';


const router = new Router([
	{
		name: 'EnergyBalance',
		pattern: /^\/empreinte-energie(\/.*)?$/,
		
		load: () => html`<app-energy-balance></app-energy-balance>`,
		importLazy: () => import('../containers/app-energy-balance'),
	},
	{
		name: 'Home',
		pattern: /^\/$/,
		
		load: () => html`<page-home></page-home>`,
		importLazy: () => import('../elements/page-home'),
	},
	{
		name: '404',
		pattern: /./,
		
		load: () => html`<page-404></page-404>`,
		importLazy: () => import('../elements/page-404'),
	},
]);


export class AppMain extends connect(LitElement) {
	
	static get is() {
		return 'app-main';
	}
	
	// noinspection JSUnusedGlobalSymbols
	static get properties() {
		return {
			route: {
				type: Object,
			},
		};
	}
	
	constructor() {
		super();
		
		// Init routes
		this._router = router;
		
		installRouter((location) => this.store.dispatch(navigateTo(location)));
	}
	
	
	//<editor-fold desc="# Renderer">
	
	// noinspection JSUnusedGlobalSymbols
	render() {
		// noinspection CssUnresolvedCustomProperty
		return html`
<style>
	:host {
		display: flex;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		
		--app-primary-color: #c97300;
		--app-primary-text-color: white;
		--app-secondary-color: #0081f5;
		--app-secondary-text-color: white;
		--app-background-color: #c7c7c7;
		
		background-color: var(--app-background-color);
	}
	
	main {
		display: flex;
		width: 100%;
	}
</style>

<main>
	<!-- Display current Route -->
	${this.route || ''}
</main>
`;
	}
	
	//</editor-fold>
	
	//<editor-fold desc="# Redux callback">
	
	// noinspection JSUnusedGlobalSymbols
	stateChanged(state) {
		this.route = this._router.process(getLocationPath(state));
	}
	
	//</editor-fold>
	
}
