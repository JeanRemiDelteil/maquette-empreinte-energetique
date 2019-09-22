import {html, LitElement} from 'lit-element';
import {connect, store} from '../store/store';
import {installRouter} from 'pwa-helpers/router';
import {navigateTo} from '../store/reducers/router/actions';
import {getLocationPath} from '../store/reducers/router/selectors';
import {Router} from '../lib/router/Router';
import ResizeSensor from '../lib/ResizeSensor';


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
		
		load: () => {
			// Auto forward to creation page for now
			Promise.resolve()
				.then(() => {
					window.history.replaceState({}, '', `/empreinte-energie/`);
					store.dispatch(navigateTo(window.location));
				});
			
			return html`<page-home></page-home>`;
		},
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
		
		--app-primary-color: var(--paper-indigo-500);
		--app-primary-text-color: white;
		--app-secondary-color: #0081f5;
		--app-secondary-text-color: white;
		--app-card-color: white;
		--app-card-text-color: #424242;
		--app-sub-text-color: #c7c7c7;
		--app-background-color: #f1e7e2;
		
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
	
	//<editor-fold desc="# LitElement lifecycle">
	
	firstUpdated(_changedProperties) {
		this._domMain = this.shadowRoot.querySelector('main');
		
		// Setup Resize event
		this._sensor = new ResizeSensor(this._domMain, this._onResize);
	}
	
	//</editor-fold>
	
	
	//<editor-fold desc="# Redux callback">
	
	// noinspection JSUnusedGlobalSymbols
	stateChanged(state) {
		this.route = this._router.process(getLocationPath(state));
	}
	
	//</editor-fold>
	
	
	_onResize() {
		window.dispatchEvent(new CustomEvent('app-resize', {
			bubbles: true,
			composed: true,
		}));
	}
	
}
