import {html, LitElement} from 'lit-element';


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
	This is HOME
</div>`;
	}
	
	//</editor-fold>
	
}
