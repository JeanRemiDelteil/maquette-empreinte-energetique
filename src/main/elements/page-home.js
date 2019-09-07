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
	<h1>HOME</h1>
	
	<div>
		<a href="/empreinte-energie">Nouvelle empreinte énergétique</a>
	</div>
</div>`;
	}
	
	//</editor-fold>
	
}
