import {html, LitElement} from 'lit-element';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-card/paper-card';
import '@polymer/iron-icon/iron-icon';

import 'highcharts/es-modules/parts/PieSeries';
import 'highcharts/es-modules/parts/ColumnSeries';

import {textFit} from '../lib/textFit';
import './icon-set';
import './highcharts-chart';
import {LG_ACTION_FOOTPRINT_EDIT, LG_CREATE_NEW_E_FOOTPRINT, LG_GRAPH_SLAVES, LG_KWH_SUB_TITLE, LG_KWH_TITLE, LG_NATIONAL_MEAN_TITLE} from '../lang/lang-fr';


const PIE_CHART_KW = 'pieChart-kW';
const PIE_CHART_KW_SUB = 'pieChart-kW-sub';
const COLUMN_CHART_COMPARE_NATIONAL_MEAN = 'COLUMN_CHART_COMPARE_NATIONAL_MEAN';


export class PageShowBalance extends LitElement {
	
	static get is() {
		return 'page-show-balance';
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
		};
	}
	
	//<editor-fold desc="# Renderers">
	
	render() {
		// noinspection CssUnresolvedCustomProperty
		return html`
<style>
	:host {
		position: relative;
		width: 100%;
		
		background-color: #f1e7e2;
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
	
	.top-container {
		flex: auto;
		display: flex;
		flex-wrap: wrap;
		
		overflow: auto;
	}
	.child-container {
		width: 50%;
		height: 50%;
	}
	
	/**<editor-fold desc="style Slave layout">*/
	.slave-container {
		display: flex;
		align-items: center;
		
		color: #434348;
	}
	.slave-container > iron-icon {
		width: 40%;
		height: 50%;
	}
	.slave-words {
		display: flex;
		flex-direction: column;
		width: 60%;
		height: 50%;
		
		box-sizing: content-box;
		margin-left: 20px;
	}
	.slave-words > .slave-number {
		width: 100%;
		height: 80%;
	}
	.slave-words > div {
		width: 100%;
		height: 20%;
	}
	/**</editor-fold>*/

</style>

<main>
	<div class="top-container">
		<highcharts-chart
			id="${PIE_CHART_KW}"
			class="child-container"
			title="${LG_KWH_TITLE}"
			type="pie"
			@chart-ready="${() => this._setupPieChart(PIE_CHART_KW, this.seriesKW, {allowPointSelect: true})}"
			@chart-drilldown="${this._onMasterDrilldown}"
		></highcharts-chart>
		
		<highcharts-chart
			id="${PIE_CHART_KW_SUB}"
			class="child-container"
			title="${LG_KWH_SUB_TITLE(this.detailsKwTitle)}"
			type="pie"
			@chart-ready="${() => this._setupPieChart(PIE_CHART_KW_SUB, null)}"
		></highcharts-chart>
		
		<highcharts-chart
			id="${COLUMN_CHART_COMPARE_NATIONAL_MEAN}"
			class="child-container"
			title="${LG_NATIONAL_MEAN_TITLE}"
			type="column"
			
			.options="${{
			legend: {enabled: false},
			xAxis: {
				categories: ['Moyenne Française', 'Total empreinte'],
			},
		}}"
			
			@chart-ready="${() => this._setupColumnChart(COLUMN_CHART_COMPARE_NATIONAL_MEAN, null)}"
		></highcharts-chart>
		
		<div class="child-container slave-container">
			<iron-icon icon="app-icon:slaves"></iron-icon>
			<div class="slave-words">
				<div class="slave-number"></div>
				<div class="slave-text">${LG_GRAPH_SLAVES}</div>
			</div>
		</div>
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
	
	//<editor-fold desc="# LitElement lifecycle">
	
	firstUpdated(_changedProperties) {
		this._domSlaveNum = this.shadowRoot.querySelector('.slave-number');
		this._domSlaveText = this.shadowRoot.querySelector('.slave-text');
		
		textFit(this._domSlaveText, {
			minFontSize: 6,
			maxFontSize: 300,
		});
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
		
		this.detailsKwTitle = `Détails des consommations "${subSeries}" en kWh`;
		
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
			name: 'Consommation (kWh)',
			colorByPoint: true,
			data: data,
			animation: {
				duration: 0,
			},
			dataLabels: {
				enabled: true,
				format: `{point.name}: {point.y:,.1f} kWh`,
				style: {
					'fontSize': '0.7em',
				},
			},
			tooltip: {
				enabled: true,
				pointFormat: `{point.name}: {point.y:,.1f} kWh`,
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
				format: `{point.name}: {point.y:,.1f} kWh`,
				style: {
					'fontSize': '0.7em',
				},
			},
			tooltip: {
				enabled: true,
				pointFormat: `{point.name}: {point.y:,.1f} kWh`,
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
		textFit(this._domSlaveNum, {
			minFontSize: 6,
			maxFontSize: 300,
		});
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
}
