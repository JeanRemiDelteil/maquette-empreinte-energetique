import {html, LitElement} from 'lit-element';
import {connect} from '../store/store';
import {installRouter} from 'pwa-helpers/router';
import {navigateTo} from '../store/reducers/router/actions';
import {getLocationPath} from '../store/reducers/router/selectors';
import {Router} from '../lib/router/Router';


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
		this._router = new Router([
			{
				name: 'test',
				pattern: /\/test/,
				
				load: () => 'This is a test !',
			},
			{
				name: 'home',
				pattern: /./,
				
				load: () => html`<page-home></page-home>`,
				importLazy: () => import('../elements/page-home'),
			},
		]);
		
		installRouter((location) => this.store.dispatch(navigateTo(location)));
	}
	
	
	//<editor-fold desc="# Renderer">
	
	// noinspection JSUnusedGlobalSymbols
	render() {
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
	}
</style>

<main>
	<a href="/test">/test</a>
	<a href="/nothing">/nothing</a>
	<a href="/">/</a>
	
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
