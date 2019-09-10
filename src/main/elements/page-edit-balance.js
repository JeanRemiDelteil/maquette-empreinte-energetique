import {html, LitElement} from 'lit-element';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu-light';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-card/paper-card';


export class PageEditBalance extends LitElement {
	
	static get is() {
		return 'page-edit-balance';
	}
	
	static get properties() {
		return {
			id: {type: String},
			baseData: {type: Object},
			inputData: {type: Object},
			inputsList: {type: Array},
		};
	}
	
	
	constructor() {
		super();
		
		this.id = '';
		this.baseData = {};
		this.inputData = {};
		this.inputsList = [];
		
		this._dropDownMenu_inputType = null;
	}
	
	render() {
		return html`
<style>
	:host {
		width: 100%;
		
		position: relative;
		
		padding: 2em;
	}
	
	main {
		display: flex;
		flex-direction: row;
		
		width: 100%;
		height: 100%;
	}
	
	.child {
		width: 50%;
	}
	
	paper-item {
		user-select: none;
		cursor: pointer;
	}
	
	
	@media screen and (max-width: 999px) {
		main {
			flex-direction: column;
		}
		
		.child {
			width: 100%;
		}
	}
	
</style>

<main>
	
	<div class="child consumption-input">
		${''}
	</div>
	
	<div class="child consumption-list">
		${this._render_balanceInputList(this.inputsList)}
	</div>
	
</main>
`;
	}
	
	/**
	 * @param {IBaseData} baseData
	 * @return {TemplateResult|TemplateResult[]}
	 * @private
	 */
	_render_input(baseData) {
		return html``;
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
