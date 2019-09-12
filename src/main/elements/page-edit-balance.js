import {html, LitElement} from 'lit-element';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu-light';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-card/paper-card';
import {calculateConsumption, CATEGORY, COEFS} from '../lib/baseData';


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
	
	paper-button[selected] {
		background-color: var(--app-primary-color);
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
		${this._render_input(this.baseData, this.inputsData)}
		
		<paper-button ?disabled="${!this._isSelectionValid(this.inputsCoefs)}" @click="${() => this._addSelection()}">Ajouter</paper-button>
	</div>
	
	<div class="child consumption-list">
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
				&& level.values['#Default#']
				&& (level = level.values['#Default#']);
				
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
<div>coefs</div>
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
	 * @param {Array<IConsumptionRef>} list
	 * @return {TemplateResult|TemplateResult[]}
	 * @private
	 */
	_render_balanceInputList(list) {
		return list.map(item => html`<div>${JSON.stringify(item)}</div>`);
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
}
