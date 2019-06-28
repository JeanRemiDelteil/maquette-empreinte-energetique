import {html, LitElement} from 'lit-element';


export class PageEnergyBalance extends LitElement {
	
	static get is() {
		return 'page-energy-balance';
	}
	
	// noinspection JSUnusedGlobalSymbols
	static get properties() {
		return {
			actions: {type: Array},
		};
	}
	
	
	constructor() {
		super();
		
		this.actions = [];
	}
	
	
	//<editor-fold desc="# Renderer">
	
	render() {
		return html`
<style>
	:host {}
</style>

<div>
	Energy balance
	
	<button @click="${this._onAddAction}">Add an action</button>
	
	<div>Actions</div>
	<div>
		${this._render_actionList(this.actions)}
	</div>
	
</div>`;
	}
	
	
	_render_actionList(actions) {
		if (!actions) return html``;
		
		return actions.map(action => html`<div>${action}</div>`);
	}
	
	//</editor-fold>
	
	//<editor-fold desc="# Listeners">
	
	_onAddAction() {}
	
	//</editor-fold>
	
}
