import {html, LitElement} from 'lit-element';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-card/paper-card';

import {LG_ACTION_FOOTPRINT_EDIT, LG_ACTION_STATISTICS, LG_CREATE_NEW_E_FOOTPRINT} from '../lang/lang-fr';


export class PageLinkBalance extends LitElement {
	
	static get is() {
		return 'page-link-balance';
	}
	
	// noinspection JSUnusedGlobalSymbols
	static get properties() {
		return {
			id: {type: String},
		};
	}
	
	//<editor-fold desc="# Renderer">
	
	render() {
		return html`
<!--suppress CssUnresolvedCustomProperty -->
<style>
	:host {
		position: relative;
		width: 100%;
	}
	
	/**<editor-fold desc="style main layout">*/
	main {
		display: flex;
		flex-direction: column;
		
		width: 100%;
		height: 100%;
	}
	.action-menu {
		flex-shrink: 0;
		display: flex;
		justify-content: space-between;
		padding: 0.8em 1em 1em;
	}
	.action-menu paper-button:not([disabled]) {
		background-color: white;
		color: var(--app-card-text-color);
	}
	.action-menu paper-button {
		margin: 0 0 0 1em;
	}
	.action-menu > a:first-child > paper-button {
		margin: 0;
	}
	.action-menu a {
		text-decoration: none;
	}
	/**</editor-fold>*/
	
	.top-container {
		flex: auto;
		display: flex;
		flex-wrap: wrap;
		
		padding: 1em 1em 0.2em;
	}

</style>

<main>
	<div class="top-container">
		
	</div>
	
	<div class="action-menu">
		<a class="btn-return-create" href="/empreinte-energie/create">
			<paper-button raised>${LG_CREATE_NEW_E_FOOTPRINT}</paper-button>
		</a>
		<a class="btn-show-edit" href="/empreinte-energie/${this.id}/modifier">
			<paper-button raised>${LG_ACTION_FOOTPRINT_EDIT}</paper-button>
		</a>
		<a class="btn-show-link" href="/empreinte-energie/${this.id}/graphiques">
			<paper-button raised>${LG_ACTION_STATISTICS}</paper-button>
		</a>
	</div>
</main>
`;
	}
	
	//</editor-fold>
	
}
