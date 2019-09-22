import {html, LitElement} from 'lit-element';
import {LG_NEW_E_FOOTPRINT} from '../lang/lang-fr';


export class PageHome extends LitElement {
	
	static get is() {
		return 'page-home';
	}
	
	// noinspection JSUnusedGlobalSymbols
	static get properties() {
		return {};
	}
	
	//<editor-fold desc="# Renderer">
	
	render() {
		return html`
<style>
	:host {}
</style>

<div>
	<h1>HOME</h1>
	
	<div>
		<a href="/empreinte-energie">${LG_NEW_E_FOOTPRINT}</a>
	</div>
</div>`;
	}
	
	//</editor-fold>
	
}
