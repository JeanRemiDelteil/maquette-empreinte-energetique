import {html, LitElement} from 'lit-element';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-card/paper-card';

import {LG_ACTION_FOOTPRINT_EDIT, LG_CREATE_NEW_E_FOOTPRINT} from '../lang/lang-fr';


export class PageShowBalance extends LitElement {
	
	static get is() {
		return 'page-show-balance';
	}
	
	static get properties() {
		return {
			inputsList: {type: Array},
			id: {type: String},
		};
	}
	
	constructor() {
		super();
		
		this.id = '';
		
		/**
		 * @type {Array<IS_EBalance_Input>}
		 */
		this.inputsList = [];
	}
	
	//<editor-fold desc="# Renderers">
	
	render() {
		// noinspection CssUnresolvedCustomProperty
		return html`
<style>
	:host {
		width: 100%;
		
		position: relative;
	}
	
	/**<editor-fold desc="style main layout">*/
	main {
		display: flex;
		flex-direction: column;
		
		width: 100%;
		height: 100%;
	}
	.top-container {
		flex: auto;
		display: flex;
		overflow: auto;
	}
	.child-main {
		width: 50%;
		padding: 2em;
		box-sizing: border-box;
	}
	.action-menu {
		flex-shrink: 0;
		display: flex;
		justify-content: space-between;
		padding: 1em;
	}
	.action-menu paper-button:not([disabled]) {
		background-color: white;
		color: var(--app-card-text-color);
	}
	.action-menu a {
		text-decoration: none;
	}
	/**</editor-fold>*/
	
	
</style>

<main>
	<div class="top-container">
		<div class="child-main"></div>
	</div>
	
	<div class="action-menu">
		<a class="btn-return-create" href="/empreinte-energie/create">
			<paper-button raised>${LG_CREATE_NEW_E_FOOTPRINT}</paper-button>
		</a>
		<a class="btn-show-edit" href="/empreinte-energie/${this.id}/modifier">
			<paper-button raised>${LG_ACTION_FOOTPRINT_EDIT}</paper-button>
		</a>
	</div>
</main>
`;
	}
	
	//</editor-fold>
	
}
