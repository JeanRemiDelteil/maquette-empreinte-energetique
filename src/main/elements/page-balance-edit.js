import {html, LitElement} from 'lit-element';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-fab/paper-fab';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-card/paper-card';

import 'highcharts/es-modules/parts/PieSeries';
import './highcharts-chart';
import './icon-set';
import {calculateConsumption, CATEGORY, COEFS, DEFAULT} from '../lib/baseData';
import {LG_ACTION_STATISTICS, LG_CREATE_NEW_E_FOOTPRINT, LG_KWH_TITLE} from '../lang/lang-fr';


export class PageBalanceEdit extends LitElement {
	
	static get is() {
		return 'page-balance-edit';
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
		
		/**
		 * @type {Array<IS_EBalance_Input>}
		 */
		this.inputsList = [];
	}
	
	set seriesKWH(value) {
		this._seriesKWH = value;
		if (!this._domPieChart) return;
		
		this._updatePie(this._domPieChart, this.seriesKWH || []);
	}
	
	get seriesKWH() {
		return this._seriesKWH;
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
		justify-content: space-between;
		
		overflow: auto;
	}
	
	.child-main {
		width: calc(50% - 0.5em);
		padding-bottom: 0.2em;
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
	
	/**<editor-fold desc="style for input">*/
	.consumption-input {
		position: relative;
		padding-top: 1em;
		padding-left: 1em;
		padding-right: 0.5em;
		overflow-y: auto;
		
		display: flex;
		flex-direction: column;
	}
	
	.input-btn {
		position: absolute;
		right: 0;
		display: flex;
		align-items: center;
		
		margin-right: 1em;
	}
	.input-btn > paper-fab {
		margin: 0;
	}
	.input-btn > paper-fab:not(:first-child) {
		margin-left: 1em;
	}
	.consumption-input-btn-back:not([disabled]),
	.consumption-input-btn-cancel:not([disabled]) {
		background-color: var(--app-card-color);
		color: var(--app-card-text-color);
	}
	.consumption-input-btn-add:not([disabled]) {
		background-color: var(--paper-green-500);
		color: white;
	}
	
	.input-tab-container {
		flex: auto;
		
		display: flex;
		overflow-x: hidden;
		
		position: relative;
	}
	
	.input-tab {
		position: relative;
		flex-shrink: 0;
		width: 100%;
		
		transition: left 500ms;
		left: var(--PageBalanceEdit-internal-slider-left, 0);
	}
	
	.category-label {
		margin-bottom: 1em;
	}
	
	.input-tab paper-button {
		background-color: var(--app-card-color);
		color: var(--app-card-text-color);
	}
	
	.input-tab paper-button[selected] {
		background-color: var(--app-primary-color);
		color: var(--app-secondary-text-color);
	}
	
	.coefs-title {
		margin-bottom: 1em;
	}
	
	.coef-item-label {
		margin-bottom: 1em;
	}
	
	.category-items {
		display: flex;
		flex-wrap: wrap;
	}
	.choice-item {
		width: calc(100% / 4 - 1em);
		height: 8em;
		
		margin: 0.5em;
	}
	.coef-item paper-button {
		min-width: 7em;
		height: 4em;
	}
	
	/**</editor-fold>*/
	
	/**<editor-fold desc="style for balance list">*/
	.input-details {
		display: flex;
		flex-direction: column;
		
		overflow-y: auto;
	}
	
	.input-graph {
		margin: 1em 1em 0 0.5em;
		padding: 1em;
	}
	
	.consumption-list {
		padding-top: 1em;
		padding-left: 0.5em;
		padding-right: 1em;
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
	
	.balance-item-2nd-row {
		display: flex;
		overflow: auto;
		
		font-size: 0.85em;
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
		
		flex: auto;
	}
	
	.balance-item-coef {
		margin-left: 1em;
		width: calc(25% - 1em);
	}
	
	.balance-item-coef-title {
		color: var(--app-sub-text-color);
	}
	
	.balance-item-coef-value {
		text-align: center;
	}
	
	.balance-item-value {
		margin-left: 1em;
		min-width: 4em;
	}
	
	/**</editor-fold>*/
	
	
	@media screen and (max-width: 1600px) {
		.choice-item {
			width: calc(100% / 3 - 1em);
		}
	}
	@media screen and (max-width: 1200px) {
		.choice-item {
			width: calc(100% / 2 - 1em);
		}
	}
	@media screen and (max-width: 900px) {
		.top-container {
			flex-wrap: wrap;
		}
		
		.action-menu {
			box-shadow: 0 0 5px 2px #0000004d;
			z-index: 1;
		}
		
		.child-main {
			width: 100%;
			padding: 1em;
		}
		
		.consumption-list {
			padding-bottom: 0.2em;
		}
		
		.choice-item {
			width: calc(100% / 3 - 1em);
		}
	}
	@media screen and (max-width: 700px) {
		.choice-item {
			width: calc(100% / 2 - 1em);
		}
	}

</style>

<main>
	
	<div class="top-container">
		<div class="child-main consumption-input">

			<div class="input-tab-container">
				${this._render_input(this.baseData, this.inputsData)}
			</div>
			<div class="input-btn">
				<paper-fab class="consumption-input-btn-cancel" icon="app-icon:cancel" mini ?disabled="${!this._isCancelValid(this.inputsData)}" ?raised="${this._isCancelValid(this.inputsData)}" @click="${() => this._inputCancel()}">Annuler</paper-fab>
				<paper-fab class="consumption-input-btn-back" icon="app-icon:arrow-back" mini ?disabled="${!this._isCancelValid(this.inputsData)}" ?raised="${this._isCancelValid(this.inputsData)}" @click="${() => this._inputBack()}">Retour</paper-fab>
				<paper-fab class="consumption-input-btn-add" icon="app-icon:add" ?disabled="${!this._isSelectionValid(this.inputsCoefs)}" ?raised="${this._isSelectionValid(this.inputsCoefs)}" @click="${() => this._addSelection()}">Ajouter</paper-fab>
			</div>
		</div>
		
		<div class="child-main input-details">
			<paper-card class="input-graph">
				<highcharts-chart
					type="pie"
					title="${LG_KWH_TITLE}"
					.options="${{
			chart: {
				style: {
					'fontFamily': `"Open Sans", Verdana, Arial, Helvetica, sans-serif`,
					'fontSize': '1em',
				},
			},
			title: {
				verticalAlign: 'bottom',
				style: {
					'fontSize': '1em',
				},
			},
		}}"
					
					@chart-ready="${({detail}) => this._setupChartKWH(detail)}"
				></highcharts-chart>
			</paper-card>
			<div class="consumption-list">
				${this._render_balanceInputList(this.inputsList)}
			</div>
		</div>
	</div>
	
	<div class="action-menu">
		<a class="btn-return-create" href="/empreinte-energie/create">
			<paper-button raised>${LG_CREATE_NEW_E_FOOTPRINT}</paper-button>
		</a>
		<a class="btn-show-stats" href="/empreinte-energie/${this.id}/graphiques">
			<paper-button raised>${LG_ACTION_STATISTICS}</paper-button>
		</a>
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
		
		const preSelection = ['Mobilité'];
		
		// auto-select first level
		const inputs = [null, ...preSelection, ...inputsData];
		
		window.requestAnimationFrame(() => {
			this._domMain
			&& this._domMain.style
				.setProperty('--PageBalanceEdit-internal-slider-left', `-${(inputs.length - 1) * 100}%`);
		});
		
		let level = baseData;
		return inputs.map((input, index) => {
			let selectedChoice = '';
			
			if (input && level.type === CATEGORY) {
				level = level.values[input];
				
				// On category without values, skip to coefs
				level.type === CATEGORY
				&& level.values[DEFAULT]
				&& (level = level.values[DEFAULT]);
				
				if (level.type === CATEGORY && index + preSelection.length < inputs.length) {
					selectedChoice = inputs[index + preSelection.length];
				}
			}
			
			return html`<div class="input-tab">${
				level.type === COEFS
					? this._render_coefs(level, index - preSelection.length)
					: this._render_category(level, index - preSelection.length, selectedChoice)
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
<h2 class="category-label">${category.label}</h2>
<div class="category-items">
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
<h2 class="coefs-title">Paramètres</h2>
<div class="coefs-items">
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
		return list
			.map(item => html`
<paper-card class="balance-item">
	<div class="balance-item-type">	
		<span>${this._render_balanceItem_title(item.data)}</span>
		<paper-icon-button @click="${() => this.deleteBalanceItem(item.id)}" icon="app-icon:delete"></paper-icon-button>
	</div>
	<div class="balance-item-2nd-row">
		<div class="balance-item-coefs">
			${item.data.coefs.map(coef => this._render_balanceItem_coef(coef))}
		</div>
		<div class="balance-item-value">
			<div class="balance-item-coef-title">${'kWh'}</div>
			<div class="balance-item-coef-value">${item.data.values.kW.toLocaleString(undefined, {maximumFractionDigits: 1})}</div>
		</div>
	</div>
</paper-card>
`)
			.reverse();
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
	
	//<editor-fold desc="# LitElement lifecycle">
	
	firstUpdated(_changedProperties) {
		this._domMain = this.shadowRoot.querySelector('main');
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
	
	/**
	 * @param {Array<string>} inputs
	 *
	 * @return {boolean}
	 * @private
	 */
	_isCancelValid(inputs) {
		return !!inputs.length;
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
	
	_inputBack() {
		this.inputsData = this.inputsData.slice(0, -1);
		this.inputsCoefs = new Map();
	}
	
	_inputCancel() {
		this.clearSelection();
	}
	
	/**
	 * @param {HighchartsChart} domPieChart
	 * @private
	 */
	_setupChartKWH(domPieChart) {
		this._domPieChart = domPieChart;
		
		domPieChart.chart.addSeries({
			type: 'pie',
			colorByPoint: true,
			data: [],
			size: '75%',
			dataLabels: {
				enabled: true,
				format: `{point.name}: {point.y:,.0f} kWh`,
				style: {
					'fontSize': '0.7em',
				},
			},
			tooltip: {
				enabled: true,
				pointFormat: `{point.y:,.0f} kWh`,
			},
		});
		
		this._updatePie(domPieChart, this.seriesKWH || []);
	}
	
	_updatePie(pieChart, data) {
		if (!pieChart || !pieChart.chart) return;
		
		pieChart.chart.series[0].setData(data, true, true);
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
