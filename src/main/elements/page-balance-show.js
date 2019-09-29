import {html, LitElement} from 'lit-element';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-card/paper-card';
import '@polymer/iron-icon/iron-icon';

import 'highcharts/es-modules/parts/PieSeries';
import 'highcharts/es-modules/parts/ColumnSeries';

import {textFit} from '../lib/textFit';
import './icon-set';
import {Highcharts} from './highcharts-chart';
import {
	LG_ACTION_FOOTPRINT_EDIT,
	LG_ACTION_FOOTPRINT_LINK,
	LG_CREATE_NEW_E_FOOTPRINT,
	LG_GRAPH_COLUMN_CURRENT_FOOTPRINT,
	LG_GRAPH_COLUMN_NATIONAL_MEAN,
	LG_GRAPH_SLAVES,
	LG_KWH_SUB_TITLE,
	LG_KWH_TITLE,
	LG_NATIONAL_MEAN_TITLE,
	LG_NO_DATA,
} from '../lang/lang-fr';


const PIE_CHART_KW = 'pieChart-kW';
const PIE_CHART_KW_SUB = 'pieChart-kW-sub';
const COLUMN_CHART_COMPARE_NATIONAL_MEAN = 'COLUMN_CHART_COMPARE_NATIONAL_MEAN';


export class PageBalanceShow extends LitElement {
	
	static get is() {
		return 'page-balance-show';
	}
	
	static get properties() {
		return {
			id: {type: String},
			
			seriesKW: {type: Object},
			detailsKwTitle: {type: String},
			numberSlaves: {type: Number},
			totalConsumption: {type: Number},
			ConsumptionNationalMean: {type: Number},
		};
	}
	
	constructor() {
		super();
		
		this.id = '';
		
		this.seriesKW = null;
		this.detailsKwTitle = '';
		this.numberSlaves = 0;
		this.totalConsumption = 0;
		this.consumptionNationalMean = 0;
		
		/**
		 * @type {Object<string, Highcharts.Chart>}
		 */
		this._chartMap = {
			[PIE_CHART_KW]: null,
			[PIE_CHART_KW_SUB]: null,
			[COLUMN_CHART_COMPARE_NATIONAL_MEAN]: null,
		};
		
		Highcharts.setOptions({
			lang: {
				noData: LG_NO_DATA,
			},
		});
		
		this._onResize = this._onResize.bind(this);
	}
	
	//<editor-fold desc="# Renderers">
	
	render() {
		// noinspection CssUnresolvedCustomProperty
		return html`
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
	.action-menu paper-button > iron-icon{
		margin-right: 1em;
	}
	.action-menu > a:first-child > paper-button {
		margin: 0;
	}
	.action-menu a {
		text-decoration: none;
	}
	.btn-return-create > paper-button:not([disabled]) {
		color: var(--paper-green-500);
	}	
	/**</editor-fold>*/
	
	.top-container {
		flex: auto;
		display: flex;
		flex-wrap: wrap;
		
        justify-content: space-between;
        align-content: space-between;
        
        padding: 1em 1em 0.2em;
        
		overflow: auto;
	}
	.child-container {
		width: calc(50% - 0.5em);
		height: calc(50% - 0.5em);
		display: flex;
		
		padding: 1em;
	}
	.child-container > .slave-container,
	.child-container > highcharts-chart {
		width: 100%;
	}
	highcharts-chart {
		font-size: 1.2em;
	}
	
	/**<editor-fold desc="style Slave layout">*/
	.slave-container {
		display: flex;
		align-items: center;
		justify-content: center;
		
		color: #434348;
	}
	.slave-container > iron-icon {
		width: 40%;
		height: 50%;
	}
	.slave-words {
		display: flex;
		flex-direction: column;
		justify-content: center;
		max-width: 60%;
		height: 50%;
		
		box-sizing: content-box;
		margin-left: 1em;
	}
	.slave-words > .slave-number {
		width: 100%;
		height: 80%;
		text-align: center;
	}
	.slave-words > div {
		width: 100%;
		height: 20%;
		text-align: center;
	}
	/**</editor-fold>*/
	
	
	@media screen and (max-width: 900px) {
	
		.top-container {
			align-content: unset;
			padding: 1em;
		}
	
		.child-container {
			width: 100%;
			height: 50%;
			
			margin-bottom: 1em;
		}
		.child-container:last-child {
            margin-bottom: 0;
		}
		
		.action-menu {
			box-shadow: 0 0 5px 2px #0000004d;
			z-index: 1;
		}
		
	}
	
	@media screen and (max-width: 700px){
		.action-menu paper-button > iron-icon{
			margin-right: 0;
		}
		.action-menu paper-button > span{
			display: none;
		}
	}
	
	
</style>

<main>
	<div class="top-container">
		<paper-card class="child-container">
			<highcharts-chart
				id="${PIE_CHART_KW}"
				title="${LG_KWH_TITLE}"
				type="pie"
				
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
				
				@chart-ready="${() => this._setupPieChart(PIE_CHART_KW, this.seriesKW, {allowPointSelect: true})}"
				@chart-drilldown="${this._onMasterDrilldown}"
			></highcharts-chart>
		</paper-card>
		
		<paper-card class="child-container">
			<highcharts-chart
				id="${PIE_CHART_KW_SUB}"
				title="${LG_KWH_SUB_TITLE(this.detailsKwTitle)}"
				type="pie"
				
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
				
				@chart-ready="${() => this._setupPieChart(PIE_CHART_KW_SUB, null)}"
			></highcharts-chart>
		</paper-card>
		
		<paper-card class="child-container">
			<highcharts-chart
				id="${COLUMN_CHART_COMPARE_NATIONAL_MEAN}"
				title="${LG_NATIONAL_MEAN_TITLE}"
				type="column"
				
				.options="${{
			chart: {
				style: {
					'fontFamily': `"Open Sans", Verdana, Arial, Helvetica, sans-serif`,
					'fontSize': '1em',
				},
			},
			legend: {enabled: false},
			title: {
				verticalAlign: 'bottom',
				style: {
					'fontSize': '1em',
				},
			},
			xAxis: {
				categories: [LG_GRAPH_COLUMN_NATIONAL_MEAN, LG_GRAPH_COLUMN_CURRENT_FOOTPRINT],
				labels: {
					style: {
						'fontFamily': `"Open Sans", Verdana, Arial, Helvetica, sans-serif`,
						'fontSize': '0.8em',
					},
				},
			},
			yAxis: {
				title: {
					enabled: false,
				},
			},
		}}"
				
				@chart-ready="${() => this._setupColumnChart(COLUMN_CHART_COMPARE_NATIONAL_MEAN, null)}"
			></highcharts-chart>
		</paper-card>
		
		<paper-card class="child-container">
			<div class="slave-container">
				<iron-icon icon="app-icon:slaves"></iron-icon>
				<div class="slave-words">
					<div class="slave-number"></div>
					<div class="slave-text">${LG_GRAPH_SLAVES}</div>
				</div>
			</div>
		</paper-card>
	</div>
	
	<div class="action-menu">
		<a class="btn-return-create" href="/empreinte-energie/create">
			<paper-button raised>
				<iron-icon icon="app-icon:new-file"></iron-icon>
				<span>${LG_CREATE_NEW_E_FOOTPRINT}</span>
			</paper-button>
		</a>
		<a class="btn-show-edit" href="/empreinte-energie/${this.id}/modifier">
			<paper-button raised>
				<iron-icon icon="app-icon:edit"></iron-icon>
				<span>${LG_ACTION_FOOTPRINT_EDIT}</span>
			</paper-button>
		</a>
		<a class="btn-show-link" href="/empreinte-energie/${this.id}/lien">
			<paper-button raised>
				<iron-icon icon="app-icon:qr-code"></iron-icon>
				<span>${LG_ACTION_FOOTPRINT_LINK}</span>
			</paper-button>
		</a>
	</div>
</main>
`;
	}
	
	//</editor-fold>
	
	//<editor-fold desc="# LitElement lifecycle">
	
	firstUpdated(_changedProperties) {
		this._domSlaveWord = this.shadowRoot.querySelector('.slave-words');
		this._domSlaveNum = this.shadowRoot.querySelector('.slave-number');
		this._domSlaveText = this.shadowRoot.querySelector('.slave-text');
		
		this._fitSlaveText();
	}
	
	updated(changedProperties) {
		
		changedProperties.forEach((oldValue, propName) => {
			// noinspection JSRedundantSwitchStatement
			switch (propName) {
				case 'seriesKW':
					this._updatePie(this._chartMap[PIE_CHART_KW], this.seriesKW.main, {allowPointSelect: true});
					break;
				
				case 'numberSlaves':
					this._formatSlavesNumber(this.numberSlaves);
					
					break;
				
				case 'consumptionNationalMean':
				case 'totalConsumption':
					if (!this.consumptionNationalMean || !this.totalConsumption) break;
					
					this._updateColumn(this._chartMap[COLUMN_CHART_COMPARE_NATIONAL_MEAN], this._buildColumnConsumptionSeries());
					
					break;
			}
		});
		
	}
	
	connectedCallback() {
		super.connectedCallback();
		
		// listen to global app resize event
		window.addEventListener('app-resize', this._onResize);
	}
	
	disconnectedCallback() {
		super.disconnectedCallback();
		
		// remove to global app resize event
		window.removeEventListener('app-resize', this._onResize);
	}
	
	//</editor-fold>
	
	
	/**
	 * @param {string} elemId
	 * @param series
	 * @param {{}} additionalOptions
	 * @private
	 */
	_setupPieChart(elemId, series, additionalOptions = {}) {
		let pieChart = this._chartMap[elemId] = this.shadowRoot.querySelector('#' + elemId);
		
		this._updatePie(pieChart, series && series.main || [], additionalOptions);
	}
	
	/**
	 * @param {CustomEvent<IEvents.Drilldown>} event
	 * @private
	 */
	_onMasterDrilldown(event) {
		const subSeries = event.detail.point.options.drilldown;
		const drilldownSeries = this.seriesKW.drilldown.index[subSeries];
		
		this.detailsKwTitle = subSeries;
		
		const series = drilldownSeries && drilldownSeries.data || null;
		
		this._updatePie(this._chartMap[PIE_CHART_KW_SUB], series);
	}
	
	/**
	 * @param {string} elemId
	 * @param series
	 * @param {{}} additionalOptions
	 * @private
	 */
	_setupColumnChart(elemId, series, additionalOptions = {}) {
		let columnChart = this._chartMap[elemId] = this.shadowRoot.querySelector('#' + elemId);
		
		this._updateColumn(columnChart, this._buildColumnConsumptionSeries(), additionalOptions);
	}
	
	_updateColumn(columnChart, data, additionalOptions) {
		if (!columnChart || !columnChart.chart) return;
		
		// Clear chart
		columnChart.chart.series.forEach(series => series.remove());
		
		columnChart.chart.addSeries({
			type: 'column',
			name: '',
			colorByPoint: true,
			data: data,
			animation: {
				duration: 0,
			},
			dataLabels: {
				enabled: true,
				format: `{point.y:,.0f} kWh`,
				style: {
					'fontSize': '0.7em',
				},
			},
			tooltip: {
				enabled: true,
				pointFormat: `{point.y:,.0f} kWh`,
			},
			...additionalOptions,
		});
	}
	
	_updatePie(pieChart, data, additionalOptions) {
		if (!pieChart || !pieChart.chart) return;
		
		// Clear chart
		pieChart.chart.series.forEach(series => series.remove());
		
		pieChart.chart.addSeries({
			type: 'pie',
			name: '',
			colorByPoint: true,
			data: data,
			animation: {
				duration: 0,
			},
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
			// allowPointSelect: true,
			...additionalOptions,
		});
	}
	
	/**
	 * @param {number} num
	 * @return {string}
	 * @private
	 */
	_formatSlavesNumber(num) {
		this._domSlaveNum.innerHTML = num.toLocaleString(undefined, {maximumFractionDigits: 1});
		this._fitSlaveText();
	}
	
	_fitSlaveText() {
		this._domSlaveWord.style.width = '60%';
		this._domSlaveNum.style.width = '';
		this._domSlaveNum.style.height = '';
		this._domSlaveText.style.width = '';
		this._domSlaveText.style.height = '';
		
		textFit(this._domSlaveNum, {
			minFontSize: 6,
			maxFontSize: 300,
		});
		textFit(this._domSlaveText, {
			minFontSize: 6,
			maxFontSize: 300,
		});
		
		const slaveNumBBox = this._domSlaveNum
			.querySelector('.textFitted')
			.getBoundingClientRect();
		const slaveTextBBox = this._domSlaveText
			.querySelector('.textFitted')
			.getBoundingClientRect();
		const maxWidth = Math.max(slaveNumBBox.width, slaveTextBBox.width);
		
		this._domSlaveNum.style.width = `${maxWidth}px`;
		this._domSlaveNum.style.height = `${slaveNumBBox.height}px`;
		this._domSlaveText.style.width = `${maxWidth}px`;
		this._domSlaveText.style.height = `${slaveTextBBox.height}px`;
		this._domSlaveWord.style.width = '';
	}
	
	_buildColumnConsumptionSeries() {
		if (!this.consumptionNationalMean || !this.totalConsumption) return null;
		
		return [
			{
				'name': 'Moyenne Française',
				'y': this.consumptionNationalMean,
			},
			{
				'name': 'Empreinte',
				'y': this.totalConsumption,
			},
		];
	}
	
	_onResize() {
		this._fitSlaveText();
	}
}
