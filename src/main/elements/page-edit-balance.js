import {html, LitElement} from 'lit-element';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu-light';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-card/paper-card';

import './icon-set';
import {calculateConsumption, CATEGORY, COEFS, DEFAULT} from '../lib/baseData';


export class PageEditBalance extends LitElement {
	
	static get is() {
		return 'page-edit-balance';
	}
	
	static get properties() {
		return {
			id: {type: String},
			baseData: {type: Object},
			
			inputsData: {type: Array},
			inputsCoefs: {type: Map},
			
			inputsList: {type: Array},
		};
	}
	
	
	constructor() {
		super();
		
		this.id = '';
		
		/**
		 * @type {IBaseData | {}}
		 */
		this.baseData = {};
		
		this.inputsData = [];
		
		/**
		 * @type {Map<IBS_Coef, IBS_Value>}
		 */
		this.inputsCoefs = new Map();
		
		/**
		 * @type {IBS_Coefs}
		 * @private
		 */
		this._selectedCoefs = null;
		
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
	
	main {
		display: flex;
		flex-direction: row;
		
		width: 100%;
		height: 100%;
	}
	
	.child-main {
		width: 50%;
		padding: 2em;
		box-sizing: border-box;
	}
	
	/* style for input */
	.consumption-input {
		overflow-y: auto;
	}
	.consumption-input-btn-add:not([disabled]) {
		margin-top: 1em;
		
		background-color: var(--paper-green-500);
		color: white;
	}
	.category-label {
		margin-bottom: 1em;
	}
	.input-tab paper-button {
		margin-bottom: 1em;
		
		background-color: var(--app-card-color);
		color: var(--app-card-text-color);
	}
	.input-tab paper-button[selected] {
		background-color: var(--app-primary-color);
		color: var(--app-secondary-text-color);
	}
	.coefs-title{
		margin-bottom: 1em;
	}
	.coef-item-label{
		margin-bottom: 1em;
	}
	
	/* style for balance list */
	.consumption-list {
		overflow-y: auto;
	}
	.balance-item {
		display: flex;
		flex-direction: column;
		margin-bottom: 0.5em;
		padding: 1em;
		
		background-color: var(--app-card-color);
		color: var(--app-card-text-color);
	}
	.balance-item-type {
		display: flex;
		align-items: baseline;
	}
	.balance-item-type > paper-icon-button {
		margin-left: auto;
		color: var(--app-sub-text-color);
	}
	.balance-item-type > paper-icon-button:hover {
		color: var(--app-card-text-color);
	}
	.balance-item-coefs {
		display: flex;
		flex-direction: row;
		/*noinspection CssOverwrittenProperties*/
		justify-content: space-around;
		/*noinspection CssOverwrittenProperties*/
		justify-content: space-evenly; /* keep the first for fall back */
	}
	.balance-item-coef {
		margin-left: 1em;
	}
	.balance-item-coef-title {
		color: var(--app-sub-text-color);
	}
	.balance-item-coef-value {
		text-align: center;
	}
	
	@media screen and (max-width: 999px) {
		main {
			flex-direction: column;
		}
		
		.child-main {
			width: 100%;
		}
	}
	
</style>

<main>
	
	<div class="child-main consumption-input">
		${this._render_input(this.baseData, this.inputsData)}
		
		<paper-button class="consumption-input-btn-add" ?disabled="${!this._isSelectionValid(this.inputsCoefs)}" @click="${() => this._addSelection()}">Ajouter</paper-button>
	</div>
	
	<div class="child-main consumption-list">
		${this._render_balanceInputList(this.inputsList)}
	</div>
	
</main>
`;
	}
	
	/**
	 * @param {IBaseData} baseData
	 * @param {string[]} inputsData
	 *
	 * @return {TemplateResult|TemplateResult[]}
	 * @private
	 */
	_render_input(baseData, inputsData) {
		if (!baseData || !inputsData) return html`not loaded`;
		
		// auto-select first level
		const inputs = [null, 'Mobilité', ...inputsData];
		
		let level = baseData;
		return inputs.map((input, index) => {
			let selectedChoice = '';
			
			if (input && level.type === CATEGORY) {
				level = level.values[input];
				
				// On category without values, skip to coefs
				level.type === CATEGORY
				&& level.values[DEFAULT]
				&& (level = level.values[DEFAULT]);
				
				if (level.type === CATEGORY && index + 1 < inputs.length) {
					selectedChoice = inputs[index + 1];
				}
			}
			
			return html`<div class="input-tab">${
				level.type === COEFS
					? this._render_coefs(level, index - 1)
					: this._render_category(level, index - 1, selectedChoice)
			}</div>`;
		});
	}
	
	/**
	 * @param {IBS_Category} category
	 * @param {number} index
	 * @param {string} selectedChoice
	 * @param {string[]} breadcrubs
	 */
	_render_category(category, index, selectedChoice, breadcrubs = []) {
		return html`
<div class="category-label">> ${category.label}</div>
<div>
	${this._render_choices(Object.keys(category.values), index, selectedChoice)}
</div>
`;
	}
	
	/**
	 * @param {IBS_Coefs} coefs
	 * @param {number} index
	 */
	_render_coefs(coefs, index) {
		this._selectedCoefs = coefs;
		
		return html`
<div class="coefs-title">Paramètres</div>
<div>
	${coefs.coefs.map(coef => html`
	<div class="coef-item">
		<div class="coef-item-label">${coef.label}</div>
		<div>${coef.values.map(value => html`
			<paper-button raised ?selected="${this._isInputCoefSelected(coef, value)}" @click="${() => this._inputCoef(coef, value)}">${value.label}</paper-button>
		`)}</div>
	</div>
	`)}
</div>
`;
	}
	
	/**
	 * @param {string[]} choices
	 * @param {number} index
	 * @param {string} selectedChoice
	 */
	_render_choices(choices, index, selectedChoice) {
		return choices.map(choice => html`
<paper-button class="choice-item" raised ?selected="${selectedChoice === choice}" @click="${() => this._inputAction(choice, index)}">${choice}</paper-button>
`);
	}
	
	/**
	 * @param {IBS_Coef} coef
	 * @param {IBS_Value} value
	 * @private
	 */
	_isInputCoefSelected(coef, value) {
		const res = this.inputsCoefs.get(coef);
		
		return res && res === value;
	}
	
	
	/**
	 * @param {Array<IS_EBalance_Input>} list
	 * @return {TemplateResult|TemplateResult[]}
	 * @private
	 */
	_render_balanceInputList(list) {
		return list.map(item => html`
<paper-card class="balance-item">
	<div class="balance-item-type">	
		<span>${this._render_balanceItem_title(item.data)}</span>
		<paper-icon-button @click="${() => this.deleteBalanceItem(item.id)}" icon="app-icon:delete"></paper-icon-button>
	</div>
	<div class="balance-item-coefs">${item.data.coefs.map(coef => this._render_balanceItem_coef(coef))}</div>
</paper-card>
`);
	}
	
	/**
	 * @param {IConsumptionRef} item
	 * @return {TemplateResult|TemplateResult[]}
	 * @private
	 */
	_render_balanceItem_title(item) {
		return html`${item.activity} > ${item.category}${!item.subCategory ? '' : ' > ' + item.subCategory}`;
	}
	
	/**
	 * @param {IBS_CoefValue} coef
	 * @return {TemplateResult|TemplateResult[]}
	 * @private
	 */
	_render_balanceItem_coef(coef) {
		return html`
<div class="balance-item-coef">
	<div class="balance-item-coef-title">${coef.title}</div>
	<div class="balance-item-coef-value">${coef.label}</div>
</div>
`;
	}
	
	
	//</editor-fold>
	
	
	/**
	 * @param {string} value
	 * @param {number} level
	 * @private
	 */
	_inputAction(value, level) {
		if (!level) {
			this.inputsData = [value];
			this.inputsCoefs = new Map();
			this._selectedCoefs = null;
		}
		else if (level > 0 && level <= this.inputsData.length) {
			this.inputsData = [...this.inputsData.slice(0, level), value];
			this.inputsCoefs = new Map();
			this._selectedCoefs = null;
		}
	}
	
	/**
	 * @param {IBS_Coef} coef
	 * @param {IBS_Value} value
	 * @private
	 */
	_inputCoef(coef, value) {
		this.inputsCoefs.set(coef, value);
		
		// noinspection JSIgnoredPromiseFromCall
		this.requestUpdate('inputsCoefs');
	}
	
	/**
	 * @param {Map<IBS_Coef, IBS_Value>} coefs
	 *
	 * @return {boolean}
	 * @private
	 */
	_isSelectionValid(coefs) {
		return this._selectedCoefs
		       && this._selectedCoefs.coefs
			       .every(coef => coefs.has(coef));
	}
	
	
	_addSelection() {
		/**
		 * @type {IConsumptionRef}
		 */
		const ref = {
			activity: Object.keys(this.baseData.values)[0],
			category: this.inputsData[0],
			subCategory: this.inputsData[1],
			
			coefs: this._selectedCoefs.coefs
				.map(coef => ({
					title: coef.label,
					...this.inputsCoefs.get(coef),
				})),
			
			baseValues: {
				baseCO2: this._selectedCoefs.baseCO2,
				baseKW: this._selectedCoefs.baseKW,
			},
		};
		
		
		this.addSelection(calculateConsumption(ref));
		this.clearSelection();
	}
	
	
	/**
	 * @param {IConsumptionRef} ref
	 */
	addSelection(ref) {}
	
	clearSelection() {
		this._selectedCoefs = null;
		this.inputsCoefs = new Map();
		this.inputsData = [];
	}
	
	/**
	 * @param {string} itemId
	 */
	deleteBalanceItem(itemId) {}
}
