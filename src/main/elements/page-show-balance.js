import {html, LitElement} from 'lit-element';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-card/paper-card';

import './highcharts-pie';
import {LG_ACTION_FOOTPRINT_EDIT, LG_CREATE_NEW_E_FOOTPRINT} from '../lang/lang-fr';


const PIE_CHART_KW = 'pieChart-kW';
const PIE_CHART_CO2 = 'pieChart-CO2';


export class PageShowBalance extends LitElement {
	
	static get is() {
		return 'page-show-balance';
	}
	
	static get properties() {
		return {
			id: {type: String},
			
			seriesKW: {type: Object},
			seriesCO2: {type: Object},
		};
	}
	
	constructor() {
		super();
		
		this.id = '';
		
		this._chartMap = {};
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
		<highcharts-pie
			id="${PIE_CHART_KW}"
			title="Graphique des consommations en kW/h/km/pers"
			@pie-ready="${() => this._onPieLoad(PIE_CHART_KW, this.seriesKW)}"
		></highcharts-pie>
		<highcharts-pie
			id="${PIE_CHART_CO2}"
			title="Graphique des consommations en g de CO2 /km/pers"
			@pie-ready="${() => this._onPieLoad(PIE_CHART_CO2, this.seriesCO2)}"
		></highcharts-pie>
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
	
	updated(changedProperties) {
		
		changedProperties.forEach((oldValue, propName) => {
			// noinspection JSRedundantSwitchStatement
			switch (propName) {
				case 'seriesKW':
					this._updatePie(this._chartMap[PIE_CHART_KW], this.seriesKW);
					break;
				
				case 'seriesCO2':
					this._updatePie(this._chartMap[PIE_CHART_CO2], this.seriesCO2);
					break;
				
			}
		});
		
	}
	
	//</editor-fold>
	
	
	/**
	 * @param {string} elemId
	 * @param series
	 * @private
	 */
	_onPieLoad(elemId, series) {
		let pieChart = this._chartMap[elemId] = this.shadowRoot.querySelector('#' + elemId);
		
		// noinspection JSUnresolvedFunction
		pieChart.chart.addSeries({
			name: '',
			colorByPoint: true,
			data: [],
		});
		
		pieChart.chart.redraw();
		
		series && this._updatePie(pieChart, series);
	}
	
	
	_updatePie(pieChart, series) {
		if (!pieChart || !pieChart.chart) return;
		
		const {main, drilldown} = series;
		
		pieChart.chart.drillUp();
		pieChart.chart.series[0].setData(main);
		pieChart.chart.drilldown.update(drilldown);
	}
}
