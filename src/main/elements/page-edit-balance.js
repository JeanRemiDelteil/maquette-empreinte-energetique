import {html, LitElement} from 'lit-element';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu-light';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-card/paper-card';
import {LG_INPUT_ADD, LG_INPUT_TYPE} from '../lang/lang-fr';


export class PageEditBalance extends LitElement {
	
	static get is() {
		return 'page-edit-balance';
	}
	
	static get properties() {
		return {
			id: {type: String},
			inputs: {type: Array},
			inputsList: {type: Array},
		};
	}
	
	
	constructor() {
		super();
		
		this.id = '';
		this.inputs = [];
		this.inputsList = [];
		
		this._dropDownMenu_inputType = null;
	}
	
	render() {
		return html`
<style>
	:host {
		display: flex;
		width: 100%;
		
		align-items: start;
		justify-content: center;
		
		padding: 2em 0;
	}
	
	main {
		display: flex;
		flex-direction: column;
	}
	
	.card {
		padding: 2em;
	}
	.card:not(:last-child) {
		margin-bottom: 2em;
	}
	
	.card-input {
		display: flex;
		align-items: baseline;
	}
	
	paper-item {
		user-select: none;
		cursor: pointer;
	}
</style>

<main>
	<paper-card class="card">Rapport ID:${this.id}</paper-card>
	
	<paper-card class="card card-input">
		<paper-dropdown-menu-light label="${LG_INPUT_TYPE}" @value-changed="${this._on_inputSelector_valueChanged}">
			<paper-listbox slot="dropdown-content">
				${this._render_inputList(this.inputs)}
			</paper-listbox>
		</paper-dropdown-menu-light>
		
		<paper-button @click="${() => this._on_AddInput(this._dropDownMenu_inputType)}">${LG_INPUT_ADD}</paper-button>
	</paper-card>
	
	<paper-card class="card">
		${this._render_balanceInputList(this.inputsList)}
	</paper-card>
</main>
`;
	}
	
	/**
	 * @param {Array} list
	 * @return {TemplateResult|TemplateResult[]}
	 * @private
	 */
	_render_inputList(list) {
		return list.map(item => html`<paper-item>${item}</paper-item>`);
	}
	
	/**
	 * @param {Array} list
	 * @return {TemplateResult|TemplateResult[]}
	 * @private
	 */
	_render_balanceInputList(list) {
		return list.map(item => html`<div>${item}</div>`);
	}
	
	
	/**
	 * @param {CustomEvent<{value: string}>} event
	 * @private
	 */
	_on_inputSelector_valueChanged(event) {
		const value = event.detail.value;
		if (!value) return;
		
		this._dropDownMenu_inputType = value;
	}
	
	
	_on_AddInput(input) {}
}
